from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from core.user_helper.jwt_util import get_token_user
from django.http import HttpResponse
from jwt.exceptions import DecodeError
import os
import mimetypes
import json
import boto3
from botocore.client import Config
import urllib
from hashlib import blake2b

s3_client = boto3.client('s3',  region_name='eu-west-1')

class ProfileImageUploadView(APIView):
    parser_classes = (MultiPartParser, )

    BASE_IMAGE_PATH = '/Users/kolja/Projects/gutenberg/client/assets/'

    def post(self, request, format=None):
        # TODO(kolja): Error handling here
        user = get_token_user({}, request)

        file_payload = request.data['file']
        _, ext = os.path.splitext(file_payload.name)

        filename = str(user.id) + ext
        print(filename)

        with open(self.BASE_IMAGE_PATH + filename, 'wb+') as destination:
            for chunk in file_payload.chunks():
                destination.write(chunk)

        if user.profile_image != 'default.png':
            os.remove(self.BASE_IMAGE_PATH + user.profile_image)

        user.profile_image = filename
        user.save()

        return Response(status=status.HTTP_201_CREATED)


def sign_s3_upload(request):
    try:
        user = get_token_user({}, request)
    except Exception:
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)
    if 'localName' not in request.GET:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    local_name, ext = os.path.splitext(request.GET['localName'])
    mime_type = mimetypes.types_map[ext]

    salt = os.urandom(blake2b.SALT_SIZE)
    hash_gen = blake2b(digest_size=32, person=str.encode(user.email), salt=salt)
    hash_gen.update(str.encode(local_name))

    filename = hash_gen.hexdigest() + ext

    url = s3_client.generate_presigned_url(
        ClientMethod='put_object',
        Params={
            'Bucket': 'gutenberg-images',
            'Key': 'profile/' + filename,
            'ACL': 'public-read',
            'ContentType': mime_type
        }
    )
 
    return HttpResponse(json.dumps({'url': url, 'filename': filename}))


def register_profile_image(request):
    try:
        user = get_token_user({}, request)
    except Exception:
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)
    if 'assetName' not in request.GET:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    asset_name = request.GET['assetName']

    if user.profile_image != 'default.png':
        # os.remove(self.BASE_IMAGE_PATH + user.profile_image)
        s3_client.delete_object(Bucket='gutenberg-images', Key='profile/' + user.profile_image)

    user.profile_image = asset_name
    user.save()

    return HttpResponse(status=status.HTTP_200_OK)

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from core.user_helper.jwt_util import get_token_user
from jwt.exceptions import DecodeError
import os

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

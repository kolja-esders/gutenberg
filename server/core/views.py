from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser

class ProfileImageUploadView(APIView):
    parser_classes = (FileUploadParser, )

    def post(self, request, format=None):
        f = request.FILES['file']
        with open('/Users/kolja/Projects/gutenberg/client/assets/' + f.name, 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)

        return Response(f.name, status=204)

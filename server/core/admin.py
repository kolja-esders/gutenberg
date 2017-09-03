from django.contrib import admin

from .models import Book, UserBookJoin

admin.site.register(Book)
admin.site.register(UserBookJoin)



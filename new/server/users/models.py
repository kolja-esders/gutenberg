from custom_user.models import AbstractEmailUser
from core.models import Book
from django.db import models


class CustomUser(AbstractEmailUser):
    username = models.CharField(max_length=31, blank=True)
    first_name = models.CharField(max_length=31, blank=True)
    last_name = models.CharField(max_length=31, blank=True)
    books = models.ManyToManyField(Book, through='core.UserBookJoin', symmetrical=False)


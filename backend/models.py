from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    books = models.ManyToManyField('self', through='UserBookJoin', symmetrical=False)

class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

class UserBookJoin(models.Model):
    user = models.ForeignKey(User)
    book = models.ForeignKey(Book)
    state = models.CharField(max_length = 31) # to-read, read, ...
    rating = models.PositiveSmallIntegerField

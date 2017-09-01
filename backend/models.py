from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

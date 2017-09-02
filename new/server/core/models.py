from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

    class Meta:
        unique_together = ('name', 'author')

    def __str__(self):
        return self.name + ' (' + self.author + ')'

class UserBookJoin(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    book = models.ForeignKey(Book)
    state = models.CharField(max_length = 31) # to-read, read, ...
    rating = models.PositiveSmallIntegerField(null=True)

    class Meta:
        unique_together = ('user', 'book')

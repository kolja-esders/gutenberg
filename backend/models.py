from django.db import models
from django.contrib.auth.models import AbstractUser

class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publishing_year = models.IntegerField(null=True)

    class Meta:
        unique_together = ('name', 'author')

    def __str__(self):
        return self.name + ' (' + self.author + ')'


class User(AbstractUser):
    books = models.ManyToManyField(Book, through='UserBookJoin', symmetrical=False)

class UserBookJoin(models.Model):
    user = models.ForeignKey(User)
    book = models.ForeignKey(Book)
    state = models.CharField(max_length = 31) # to-read, read, ...
    rating = models.PositiveSmallIntegerField(null=True)

    class Meta:
        unique_together = ('user', 'book')

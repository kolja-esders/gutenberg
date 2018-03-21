from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from custom_user.models import AbstractEmailUser
from django.utils import timezone
from django.core.validators import MinLengthValidator

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()

class Language(models.Model):
    alpha3 = models.CharField(max_length=3, validators=[MinLengthValidator(4)])
    name = models.CharField(max_length=32, null=True)
    english_name = models.CharField(max_length=32, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    def __str__(self):
        return self.english_name

class Author(models.Model):
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Publisher(models.Model):
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=32)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Edition(models.Model):
    book = models.ForeignKey('Book', related_name='editions')
    title = models.CharField(max_length=128)
    num_edition = models.PositiveSmallIntegerField()
    num_pages = models.PositiveSmallIntegerField(null=True)
    abstract = models.TextField(null=True)
    cover_image = models.CharField(max_length=128, null=True)
    language = models.ForeignKey(Language, related_name='editions')
    isbn10 = models.CharField(max_length=13, null=True, unique=True, validators=[MinLengthValidator(13)])
    isbn13 = models.CharField(max_length=17, null=True, unique=True, validators=[MinLengthValidator(17)])
    publisher = models.ForeignKey(Publisher, null=True)
    date_published = models.DateTimeField(null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class Platform(models.Model):
    name = models.CharField(max_length=32)
    url = models.CharField(max_length=64)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Book(models.Model):
    author = models.ForeignKey(Author, related_name='books')
    # TODO(kolja): Figure out a way to make original_edition a one-way-street without a related_name.
    # Could also remove this foreign key and add is_original to Edition.
    original_edition = models.OneToOneField(Edition, blank=True, related_name='original_book', null=True, default=None)
    genres = models.ManyToManyField(Genre, related_name='books')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('author', 'original_edition')

class EditionPlatformJoin(models.Model):
    edition = models.ForeignKey(Edition)
    platform = models.ForeignKey(Platform)
    uid = models.CharField(max_length=64)
    rating = models.FloatField()
    url = models.CharField(max_length=128)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('edition', 'platform')

class Group(models.Model):
    name = models.CharField(max_length=32, unique=True)
    name_url = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    @staticmethod
    def get_url_from_name(name):
        return name.strip().lower().replace('.', '').replace(',', '').replace(' ', '-')

class CustomUser(AbstractEmailUser):
    username = models.CharField(max_length=31, blank=True)
    first_name = models.CharField(max_length=31, blank=True)
    last_name = models.CharField(max_length=31, blank=True)
    profile_image = models.CharField(max_length=128, blank=True, default='default.png')
    groups = models.ManyToManyField(Group, through='Membership', symmetrical=False, related_name='members')
    editions = models.ManyToManyField(Book, through='EditionUserJoin', symmetrical=False, related_name='users')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)


class EditionUserJoin(models.Model):
    edition = models.ForeignKey(Edition)
    user = models.ForeignKey(CustomUser)
    book = models.ForeignKey(Book)
    state = models.CharField(max_length=16)
    rating = models.PositiveSmallIntegerField(null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('edition', 'user')

class GroupInvite(models.Model):
    group = models.ForeignKey(Group)
    email = models.CharField(max_length=63)
    first_name = models.CharField(max_length=31, blank=True)
    last_name = models.CharField(max_length=31, blank=True)
    verification_token = models.CharField(max_length=64, unique=True)
    created_by = models.ForeignKey(CustomUser, related_name='sent_invites')
    consumed = models.BooleanField(default=False)
    email_sent = models.BooleanField(default=False)
    invitee = models.ForeignKey(CustomUser, related_name='received_invites', default=None, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('email', 'group')

class Membership(models.Model):
    user = models.ForeignKey(CustomUser)
    group = models.ForeignKey(Group)
    invite = models.ForeignKey(GroupInvite, default=None, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'group')

# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2018-03-21 19:07
from __future__ import unicode_literals

import core.models
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(db_index=True, max_length=255, unique=True, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(blank=True, max_length=31)),
                ('first_name', models.CharField(blank=True, max_length=31)),
                ('last_name', models.CharField(blank=True, max_length=31)),
                ('profile_image', models.CharField(blank=True, default='default.png', max_length=128)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='books', to='core.Author')),
            ],
        ),
        migrations.CreateModel(
            name='Edition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('num_edition', models.PositiveSmallIntegerField()),
                ('num_pages', models.PositiveSmallIntegerField(null=True)),
                ('abstract', models.TextField(null=True)),
                ('cover_image', models.CharField(max_length=128, null=True)),
                ('isbn10', models.CharField(max_length=13, null=True, unique=True, validators=[django.core.validators.MinLengthValidator(13)])),
                ('isbn13', models.CharField(max_length=17, null=True, unique=True, validators=[django.core.validators.MinLengthValidator(17)])),
                ('date_published', models.DateTimeField(null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='editions', to='core.Book')),
            ],
        ),
        migrations.CreateModel(
            name='EditionPlatformJoin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(max_length=64)),
                ('rating', models.FloatField()),
                ('url', models.CharField(max_length=128)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
                ('edition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Edition')),
            ],
        ),
        migrations.CreateModel(
            name='EditionUserJoin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(max_length=16)),
                ('rating', models.PositiveSmallIntegerField(null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Book')),
                ('edition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Edition')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, unique=True)),
                ('name_url', models.CharField(max_length=64, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='GroupInvite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=63)),
                ('first_name', models.CharField(blank=True, max_length=31)),
                ('last_name', models.CharField(blank=True, max_length=31)),
                ('verification_token', models.CharField(max_length=64, unique=True)),
                ('consumed', models.BooleanField(default=False)),
                ('email_sent', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_invites', to=settings.AUTH_USER_MODEL)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Group')),
                ('invitee', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='received_invites', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alpha3', models.CharField(max_length=3, validators=[django.core.validators.MinLengthValidator(4)])),
                ('name', models.CharField(max_length=32, null=True)),
                ('english_name', models.CharField(max_length=32, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Group')),
                ('invite', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.GroupInvite')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Platform',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('url', models.CharField(max_length=64)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Publisher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.AddField(
            model_name='editionplatformjoin',
            name='platform',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Platform'),
        ),
        migrations.AddField(
            model_name='edition',
            name='language',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='editions', to='core.Language'),
        ),
        migrations.AddField(
            model_name='edition',
            name='publisher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='core.Publisher'),
        ),
        migrations.AddField(
            model_name='book',
            name='genres',
            field=models.ManyToManyField(related_name='books', to='core.Genre'),
        ),
        migrations.AddField(
            model_name='book',
            name='original_edition',
            field=models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='original_book', to='core.Edition'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='editions',
            field=models.ManyToManyField(related_name='users', through='core.EditionUserJoin', to='core.Book'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(related_name='members', through='core.Membership', to='core.Group'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AlterUniqueTogether(
            name='membership',
            unique_together=set([('user', 'group')]),
        ),
        migrations.AlterUniqueTogether(
            name='groupinvite',
            unique_together=set([('email', 'group')]),
        ),
        migrations.AlterUniqueTogether(
            name='editionuserjoin',
            unique_together=set([('edition', 'user')]),
        ),
        migrations.AlterUniqueTogether(
            name='editionplatformjoin',
            unique_together=set([('edition', 'platform')]),
        ),
        migrations.AlterUniqueTogether(
            name='book',
            unique_together=set([('author', 'original_edition')]),
        ),
    ]

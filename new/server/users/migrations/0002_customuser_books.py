# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-09-02 22:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='books',
            field=models.ManyToManyField(through='core.UserBookJoin', to='core.Book'),
        ),
    ]

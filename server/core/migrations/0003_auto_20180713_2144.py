# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2018-07-13 21:44
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20180630_1802'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookplatformjoin',
            name='data',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=None, null=True),
        ),
    ]

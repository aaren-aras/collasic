# Generated by Django 4.1 on 2022-08-26 04:41

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_created_at_lobby_creation_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lobby',
            name='lobby_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='lobby',
            name='pin',
            field=models.CharField(default=api.models.generate_unique_pin, max_length=6, unique=True),
        ),
    ]

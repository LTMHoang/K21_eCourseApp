# Generated by Django 5.0.3 on 2024-03-18 16:57

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_lesson_comment_like'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='image',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='image',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
    ]

# Generated by Django 2.1 on 2018-08-11 04:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ErrorImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='StudentError',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('contributor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='errors_shared', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Suggestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('associated_error', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='error_suggestions', to='error_log_mgmt.StudentError')),
                ('suggestor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='suggestions_given', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='errorimage',
            name='associated_error',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='error_images', to='error_log_mgmt.StudentError'),
        ),
        migrations.AddField(
            model_name='errorimage',
            name='uploader',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images_uploaded', to=settings.AUTH_USER_MODEL),
        ),
    ]

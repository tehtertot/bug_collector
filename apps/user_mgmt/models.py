from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    loc = models.CharField(max_length=30)
    def __repr__(self):
        return f"User object: {self.email}"
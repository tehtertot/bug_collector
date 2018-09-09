from django.db import models
from django.contrib.auth.models import AbstractUser

class MobileType(models.Model):
    os = models.CharField(max_length=10)
    def __repr__(self):
        return f"MobileType object: {self.os}"
    def __str__(self):
        return f"{self.os}"

class CustomUser(AbstractUser):
    email = models.EmailField(max_length=45, blank=True)
    loc = models.CharField(max_length=30)
    favorite_candy = models.CharField(max_length=20, blank=True)
    mobile_number = models.CharField(max_length=20, blank=True)
    mobile_OS = models.ForeignKey(MobileType, related_name="users", on_delete=models.SET_NULL, blank=True, null=True)
    def __repr__(self):
        return f"User object: {self.username}"
    def display_name(self):
        return f"{self.first_name} {self.last_name[0] if len(self.last_name) > 0 else ''}."
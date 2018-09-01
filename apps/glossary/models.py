from django.db import models

class GlossaryItem(models.Model):
    term = models.CharField(max_length=100)
    definition = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

from django.db import models
from ..user_mgmt.models import CustomUser

class Keyword(models.Model):
    word = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

class StudentError(models.Model):
    description = models.TextField()
    contributor = models.ForeignKey(CustomUser, related_name="errors_shared", on_delete=models.CASCADE)
    keywords = models.ManyToManyField(Keyword, related_name="errors_submitted")
    # stack
    def __repr__(self):
        return f"from {self.contributor}: {self.description}"

class ErrorImage(models.Model):
    url = models.CharField(max_length=255)
    uploader = models.ForeignKey(CustomUser, related_name="images_uploaded", on_delete=models.CASCADE)
    associated_error = models.ForeignKey(StudentError, related_name="error_images", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

class Suggestion(models.Model):
    content = models.TextField()
    suggestor = models.ForeignKey(CustomUser, related_name="suggestions_given", on_delete=models.CASCADE)
    associated_error = models.ForeignKey(StudentError, related_name="error_suggestions", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
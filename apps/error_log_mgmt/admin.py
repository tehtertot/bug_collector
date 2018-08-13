from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import StudentError

class StudentErrorAdmin(admin.ModelAdmin):
    pass

admin.site.register(StudentError, StudentErrorAdmin)
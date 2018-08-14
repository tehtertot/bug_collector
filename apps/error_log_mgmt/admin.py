from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import StudentError, Keyword

class StudentErrorAdmin(admin.ModelAdmin):
    pass

class KeywordAdmin(admin.ModelAdmin):
    pass

admin.site.register(StudentError, StudentErrorAdmin)
admin.site.register(Keyword, KeywordAdmin)
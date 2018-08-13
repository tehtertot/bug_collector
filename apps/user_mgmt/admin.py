from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomRegistrationForm, CustomEditUserForm
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    add_form = CustomRegistrationForm
    form = CustomEditUserForm
    model = CustomUser
    list_display = ['email', 'first_name', 'last_name', 'username']

admin.site.register(CustomUser, CustomUserAdmin)
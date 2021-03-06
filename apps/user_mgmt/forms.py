from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser
# from push_notifications.models import GCMDevice

class CustomRegistrationForm(UserCreationForm):
    def register_for_notifications(self):
        pass
        # fcm_device = GCMDevice.objects.create(registration_id="token", cloud_messaging_type="FCM", user=self)
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'mobile_number', 'mobile_OS', 'favorite_candy')
    
class CustomEditUserForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = ('username', 'email')
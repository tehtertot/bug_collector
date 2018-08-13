from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path('signup/', views.Registration.as_view(), name='signup'),
]
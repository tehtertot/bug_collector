from django.urls import path
from . import views

app_name = "glossary"
urlpatterns = [
    path('', views.index, name="home")
]
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = "main"
urlpatterns = [
    path('', views.index, name="home"), 
    path('add', views.add, name="add"),
    path('create', views.create, name="create"),
    path('show/<int:id>', views.show, name="show")
]
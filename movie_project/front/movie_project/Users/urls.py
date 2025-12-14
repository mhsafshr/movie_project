from django.urls import path , re_path
from django.contrib import admin
from Movie import apps
from . import views 

apps_name = 'Users' 

urlpatterns = [
       re_path(r'^$',views.show,name='show'),
    ]

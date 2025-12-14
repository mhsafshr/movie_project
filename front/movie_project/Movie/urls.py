
from django.urls import path , re_path
from django.contrib import admin
from Movie import apps 
from views import SearchPage , HomePage , MovieDetailPage , ActorOrDirectorDetailPage
from . import views 

apps_name = 'Movie' 

urlpatterns = [
       re_path(r'^$',HomePage.as_view(),name='show'), 
       re_path('search/',SearchPage.as_view(),name='search'), 
       re_path('moviedetail/<int:pk>/',MovieDetailPage.as_view(),name='movie'),
       re_path('actorordirectordetail/<int:pk>/',ActorOrDirectorDetailPage.as_view(),name='actorordirector'),
    ]

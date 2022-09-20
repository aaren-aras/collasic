from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),  # Home Page
    path('create', views.index),  # 'Create Lobby' Page
    path('join', views.index),  # 'Join Lobby' Page
    path('lobby/<str:lobbyPin>', views.index) # Lobby Pages; dynamic URL 
]

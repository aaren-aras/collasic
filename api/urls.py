from django.urls import path
from .views import LobbyView, CreateLobbyView, GetLobby

# *Note: Multiple endpoints can go to the same web page 
urlpatterns = [
    path('lobby', LobbyView.as_view()), # 'as_view()': Connects view class with its URL 
    path('create-lobby', CreateLobbyView.as_view()),
    path('get-lobby', GetLobby.as_view()) # *Note: "?" in URL means we're passing a variable 
]


# Views: Functions/Classes that receieve web requests and return web responses
# Rendering: Process of turning HTML/CSS/JS into viewable web page(s)
from django.shortcuts import render

# 'status': Gives access to HTTP status codes (indicates whether HTTP request is successfully completed)
from rest_framework import generics, status
from rest_framework.views import APIView
# Used to send CUSTOM responses from view
from rest_framework.response import Response

from . import serializers
from . import models

'''
• API Endpoints: Points at which an API directly connects with program(s) (e.g., like synapses of neurons)
• User sends HTTP Request ~> API Endpoint ~> User is sent HTTP Response (JSON? HTML?) to be Rendered
• All of Collasic's API Endpoints are Written Below 
'''

# Pre-set view that returns ALL lobbies in JSON format (with its easily-understandable key-value pairs)


class LobbyView(generics.ListAPIView):
    # 'queryset': Collection of objects (data) from database
    # 'all()': Returns true if all items in iterable are TRUE, otherwise returns FALSE
    queryset = models.Lobby.objects.all()
    # Converts queryset into returnable format
    serializer_class = serializers.LobbySerializer


class GetLobby(APIView):
    serializer_class = serializers.LobbySerializer
    lookup_url_kwarg = 'pin'  # Passing parameter 'pin' when GET request sent to 'GetLobby'
    def get(self, request, format=None):
        # 'GET' gives URL info from GET request, and 'get(_)' retrieves parameter from URl matching "_"  
        pin = request.GET.get(self.lookup_url_kwarg)  
        if pin != None:
            lobby = models.Lobby.objects.filter(pin=pin) # Checks for lobby with matching pin 
            if len(lobby) > 0:
                # Serializing the lobby from index 0 (since there's only one matching lobby)
                # '.data' extracts data into a "Python dictionary" of sorts from 'LobbySerializer'
                data = serializers.LobbySerializer(lobby[0]).data
                # Checks if user is a previous host by comparing their session key with host's
                # If not, then they're data is added to dictionary
                data['is_host'] = self.request.session.session_key == lobby[0].host  
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Lobby Not Found': 'Invalid lobby pin..'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Pin parameter not found in request..'}, status=status.HTTP_400_BAD_REQUEST)

# 'APIView' will auto-dispatch HTTP requests to appropriate methods (e.g., HTTP GET Request -> 'def get')
class CreateLobbyView(APIView):
    serializer_class = serializers.CreateLobbySerializer

    def post(self, request, format=None):
        # (1) If no pre-existing session, then create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # (2) Converts POST request data into Python
        serializer = self.serializer_class(data=request.data)
        # (3) Checks if fields are part of POST request data sent
        if serializer.is_valid():
            skip_votes = serializer.data.get('skip_votes')
            can_pause = serializer.data.get('can_pause')
            host = self.request.session.session_key
            queryset = models.Lobby.objects.filter(host=host)
            if queryset.exists():  # Updating a pre-existing lobby
                lobby = queryset[0]
                lobby.skip_votes = skip_votes
                lobby.can_pause = can_pause
                lobby.save(update_fields=['skip_votes', 'can_pause'])
                # Return a response stating if data was valid or not
                return Response(serializers.LobbySerializer(lobby).data, status=status.HTTP_200_OK)
            else:  # Creating a new lobby
                lobby = models.Lobby(host=host, skip_votes=skip_votes, can_pause=can_pause)
                lobby.save()
                # Return a response stating if data was valid or not
                return Response(serializers.LobbySerializer(lobby).data, status=status.HTTP_201_CREATED)
        # Return a response stating if data was valid or not
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

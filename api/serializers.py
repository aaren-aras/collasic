''' 'serializers.py': Translates complex data (i.e., model instances, querysets) into 
Python to be rendered into JSON, XML, etc. (key-value pairs) '''
from rest_framework import serializers
from . import models

class LobbySerializer(serializers.ModelSerializer):
    class Meta:  # The inner class of model classes; obtain info without creating instances of classes
        model = models.Lobby
        # 'id': Each model innately has a 'primary key' for UNIQUEly identifying it and it alone
        # It doesn't have to be defined under model classes
        # Can also use 'fields = __all__' 
        fields = ('id', 'pin', 'host', 'creation_date', 'skip_votes', 'can_pause')

# Ensures data payload being sent in POST request is valid, and corresponds with correct lobby fields
class CreateLobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lobby
        # Field data we want to retrieve sent with POST request 
        fields = ('skip_votes', 'can_pause') 




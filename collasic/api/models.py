from django.db import models
import string, random 


def generate_unique_pin():
    length = 6 
    while True:
        # Generates a pin of 'k' length with just ASCII uppercase letters 
        pin = ''.join(random.choices(string.ascii_uppercase, k=length)) 
        # Checks if any lobbies' pins in database identically match the newly-generated one
        # If so, then infinite loop repeats to generate another pin; if not, then it terminates 
        if Lobby.objects.filter(pin=pin).count() == 0: 
            break
    return pin


# Models: Objects used by Django to do database operations (e.g., (c)reate, (r)ead, (u)pdate, (d)elete)
# Django Rule: "FAT Models, THIN Views!"" In other words, put majority of code under models, not views
class Lobby(models.Model):
    # Auto-generated 
    pin = models.CharField(max_length=6, default=generate_unique_pin, unique=True)  # Don't include ()
    creation_date = models.DateTimeField(auto_now_add=True) 
    
    # Collected from unique key per session (temporary connection b/w 2 devices)
    # E.g., sessions prevent the need to sign-in every time you open a new Instagram page/browser 
    host = models.CharField(max_length=20, unique=True)  # from session key 
    
    # Collected from 'CreateLobbyiew' -> 'def post()'; 'null-False': Value MUST be passed
    skip_votes = models.IntegerField(null=False, default=1) 
    can_pause = models.BooleanField(null=False, default=False)  











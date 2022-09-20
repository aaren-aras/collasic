from django.shortcuts import render


# Renders 'index.html' file under 'templates' folder for React to take care of  
# '*args': Enables the passing of any number of POSITIONAL arguments
# '**kwargs': Enables the passing of any number of KEYWORD (kw) arguments 
def index(request, *args, **kwargs):
    # Takes HTTP request (request) and template ('index.html') and returns HTTP response (HTML)
    return render(request, 'frontend/index.html') 
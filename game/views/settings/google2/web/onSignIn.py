from django.shortcuts import redirect
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.models.player.player import Player
from django.contrib.auth import login
from random import randint

def onSignIn(request):
    print("HHHHHHHHHHHHH")
    data = request.GET
    print(data)





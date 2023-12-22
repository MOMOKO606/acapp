from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    line1 = '<h1 style="text-align: center">Welcome to the DOTA world</h1>'
    line2 = '<p style="text-align: center"><img src="https://dmarket.com/blog/best-dota2-wallpapers/dota2logo_hu63a418b03843b39b133100730abc88ee_104613_1920x1080_resize_q100_lanczos.jpg" width=1200></p>'
    line3 = '<a href="/play/">Go to the game</a>'
    line4 = '<hr>'
    return HttpResponse(line1 + line3 + line4 + line2)

def play(request):
    line1 = '<h1 style="text-align: center">Game Menu</h1>'
    line2 = '<p style="text-align: center"><img src="https://dmarket.com/blog/best-dota2-wallpapers/dota2heroes9_hu9c86aa7e6a6fc7a27835e96ba206b0fc_211614_1920x1080_resize_q100_lanczos.jpg" width=1200></p>'
    line3 = '<a href="/">Go Back</a>'
    return HttpResponse(line1 + line3 + line2)



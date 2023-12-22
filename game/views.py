from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    line1 = '<h1 style="text-align: center">DOTA</h1>'
    line2 = '<p style="text-align: center"><img src="https://dmarket.com/blog/best-dota2-wallpapers/dota2logo_hu63a418b03843b39b133100730abc88ee_104613_1920x1080_resize_q100_lanczos.jpg" width=1200></p>'
    return HttpResponse(line1 + line2)

from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player

def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()

    if not username or not password:
        return JsonResponse({
            "result": "Missing username/password"
        })
    if password != password_confirm:
        return JsonResponse({
            "result": "Password must match"
        })
    #  查找数据库
    if User.objects.filter(username = username).exists():
        return JsonResponse({
            "result": "Username exists"
        })
    #  创建user到database
    user = User(username = username)
    user.set_password(password)
    user.save()
    #  创建player到user
    Player.objects.create(user = user, photo = "https://i.postimg.cc/Kj4k9VMc/images.jpg")
    login(request, user)
    return JsonResponse({
        "result": "success"
    })


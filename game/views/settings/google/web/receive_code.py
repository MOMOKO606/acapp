from django.shortcuts import redirect
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.models.player.player import Player
from django.contrib.auth import login
from random import randint

def receive_code(request):
    data = request.GET
    code, state = data.get("code"), data.get("state")

    #  暗号错误，可能是攻击
    if not cache.has_key(state):
        return redirect("index")
    #  暗号已经不需要了，删掉
    cache.delete(state)

    apply_access_token_url = "https://www.acwing.com/third_party/api/oauth2/access_token/"
    params = {
            "appid": "6423",
            "secret": "3d4cfd93a6074835a3b4890f642cf6ee",
            "code": code,
    }

    #  用GET方法访问apply_access_token_url,并传参数params
    #  返回结果存在access_token_res中
    access_token_res = requests.get(apply_access_token_url, params = params).json()
    access_token = access_token_res["access_token"]
    openid = access_token_res["openid"]

    #  如果此人已经sigin in with xxx了，则直接登录
    players = Player.objects.filter(openid = openid)
    if players.exists():
        login(request, players[0].user)
        return redirect("index")

    #  再用access_token去获取用户头像
    get_userinfo_url = "https://www.acwing.com/third_party/api/meta/identity/getinfo/"
    params = {
            "access_token": access_token,
            "openid": openid
    }
    userinfo_res = requests.get(get_userinfo_url, params = params).json()
    username = userinfo_res["username"]
    photo = userinfo_res["photo"]

    #  如果第三方登录的用户名与数据库中的用户名有重名
    #  则给用户名后加随机数直到不重名为止
    while User.objects.filter(username = username).exists():
        username += str(randint(0, 9))

    user = User.objects.create(username = username)
    player = Player.objects.create(user = user, photo = photo, openid = openid)

    login(request, user)

    # index是game/urls/index即主页（default page）
    return redirect("index")

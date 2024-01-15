from django.shortcuts import redirect
from django.core.cache import cache
import requests

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


    print(access_token_res)
    # index是game/urls/index即主页（default page）
    return redirect("index")

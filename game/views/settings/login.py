from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def signin(request):
    data = request.GET
    username = data.get("username")
    password = data.get("password")
    #  验证函数
    user = authenticate(username = username, password = password)
    if not user:
        return JsonResponse({
            "result": "Invalid Username or Password"
        })
    #  登录    
    login(request, user)
    return JsonResponse({
        "result": "success",
    })

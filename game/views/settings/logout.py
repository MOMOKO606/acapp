from django.http import JsonResponse
from django.contrib.auth import logout

def signout(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            "result": "success",
        })
    #  从request中把cookie删掉并登出
    logout(request)
    return JsonResponse({
        "result": "success",
    })

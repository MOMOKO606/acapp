from django.http import JsonResponse
#  从文件夹gama/models/player/player.py中载入Player class
from game.models.player.player import Player

def getinfo_acapp(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            "result": "未登录"
        })
    else:
        player = Player.objects.filter(user = user)[0]
        # 为什么layer = Player.objects.get(user = user)不行
        return JsonResponse({
            'result': "success",
            'username': player.user.username,
            'photo': player.photo,
        })


def getinfo_web(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
	    'result': "未登录"
        })
    else:
        player = Player.objects.filter(user = user)[0]
        #  为什么play = Player.objects.get(user = user)不行
        return JsonResponse({
            'result': "success",
            'username': player.user.username,
            'photo': player.photo,
    	})

def getinfo(request):
    platform = request.GET.get("platform")
    if platform == "ACAPP":
        return getinfo_acapp(request)
    elif platform == "WEB":
        return getinfo_web(request)

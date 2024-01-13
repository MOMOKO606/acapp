from django.http import JsonResponse
from urllib.parse import quote  # 传url时重新编码替换特殊字符
from random import randint
from django.core.cache import cache # redis


def get_state():
    res = ""
    for i in range(9):
        res += str(randint(0, 9))
    return res


def apply_code(request):
    #  传给google credential的四个值
    appid = "165"  # google credentials 中的 OAuth client ID.
    #  接收google传回code的地址（重新编码过）
    redirect_uri = quote("https://app6423.acapp.acwing.com.cn/settings/google/web/receive_code/")
    scope = "userinfo"
    state = get_state()  # 随机值，握手用的暗号
    cache.set(state, True, 7200)  # 把state随机值存到redis键值对中，有效期2小时
    
    apply_code_url = ""
    return JsonResponse({
            "result": "success",
            "apply_code_url": apply_code_url + "?appid=%s&redirect_uri=%s&scope=%s&state=%s" % (appid, redirect_uri, scope, state),
        })


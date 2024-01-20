from django.http import JsonResponse
from urllib.parse import quote  # 传url时重新编码替换特殊字符
from random import randint
from django.core.cache import cache # redis
from google_auth_oauthlib.flow import Flow







def apply_code(request):
    # 定义 OAuth 2.0 凭证的信息
    client_id = "901762832151-1pb0q2e95m8q2k0cadu1vvchnpj7nv80.apps.googleusercontent.com"
    client_secret = "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"
    redirect_uri = "https://app6423.acapp.acwing.com.cn/settings/google2/web/receive_code/"
    scope = "profile"
    state = "49217"
    
    # 创建 OAuth 2.0 流
    #flow = Flow.from_client_secrets_file(
    #    "path/to/client_secret.json",
    #    scopes=scope,
    #    redirect_uri=redirect_uri
    #    )

    # 获取授权 URL
    #auth_url, _ = flow.authorization_url(prompt="consent")

    # 打印授权 URL
    #print("Please go to this URL to authorize the application: {}".format(auth_url))

    apply_code_url = "https://accounts.google.com/o/oauth2/auth/"
    return JsonResponse({
        "result": "success",
        "apply_code_url": apply_code_url + "?appid=%s&redirect_uri=%s&scope=%s&state=%s" % (client_id, redirect_uri, scope, state),
    })


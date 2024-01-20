from django.shortcuts import render, redirect
from google_auth_oauthlib.flow import Flow
import google.auth.transport.requests
import google.oauth2.id_token

def receive_code(request):
    client_id = "901762832151-1pb0q2e95m8q2k0cadu1vvchnpj7nv80.apps.googleusercontent.com"
    # 获取从 Google 授权服务器返回的授权码
    authorization_response = request.build_absolute_uri()
    flow.fetch_token(authorization_response=authorization_response)

    # 使用访问令牌获取用户信息
    credentials = flow.credentials
    id_token = credentials.id_token

    # 验证 ID 令牌
    request = google.auth.transport.requests.Request(request)
    id_info = google.oauth2.id_token.verify_oauth2_token(
        id_token, request, client_id)

    # 现在，id_info 包含用户的配置文件信息，例如用户名和头像
    user_profile = {
        'username': id_info['name'],
        'avatar': id_info['picture'],
    }

    print(user_profile["username"])

    #return render(request, "oauth_callback_success.html", {'user_profile': user_profil})

from django.urls import path, include # 引入路径管理
from game.views.settings.getinfo import getinfo
from game.views.settings.login import signin
from game.views.settings.logout import signout
from game.views.settings.register import register
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name='settings_token'),
    path("token/refresh", TokenRefreshView.as_view(), name='settings_token_refresh'),
    path("getinfo/", getinfo, name = "settings_getinfo"),
    path("login/", signin, name = "settings_login"),
    path("logout/", signout, name = "settings_logout"),
    path("register/", register, name = "settings_register"),
    path("google/", include("game.urls.settings.google.index")),
    path("google2/", include("game.urls.settings.google2.index")),
]

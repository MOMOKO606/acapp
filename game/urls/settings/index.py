from django.urls import path, include # 引入路径管理
from game.views.settings.getinfo import getinfo

urlpatterns = [
    path("getinfo/", getinfo, name = "settings_getinfo"),
]

from django.urls import path
from game.views.settings.google.web.apply_code import apply_code
from game.views.settings.google.web.receive_code import receive_code

urlpatterns = [
    path("web/apply_code/", apply_code, name = "settings_google_web_apply_code"),
    path("web/receive_code/", receive_code, name = "settings_google_web_receive_code"),
]

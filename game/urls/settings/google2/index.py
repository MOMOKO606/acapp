from django.urls import path
from game.views.settings.google2.web.onSignIn import onSignIn

urlpatterns = [
        path("web/onSignIn/", onSignIn, name = "settings_google2_web_onSignIn")
]

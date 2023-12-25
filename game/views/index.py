from django.shortcuts import render # 从django.shortcuts引入render

def index(request):
    return render(request, "multiends/web.html") # 返回响应，渲染"/game/templates/multiends/web.html"

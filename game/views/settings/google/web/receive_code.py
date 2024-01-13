from django.shortcuts import redirect

def receive_code(request):
    # index是game/urls/index即主页（default page）
    return redirect("index")

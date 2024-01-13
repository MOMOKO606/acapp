from django.http import JsonResponse

def apply_code(request):
    appid = "165"  # google credentials 中的 OAuth client ID.
    return JsonResponse({
            "result": "success"
        })



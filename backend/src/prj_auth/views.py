from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class CSRFView(APIView):
    # クッキーごとにキャッシュするのはありかもしれない
    @method_decorator(cache_page(30))
    @method_decorator(vary_on_cookie)
    def get(self, request, format=None):
        return Response({'csrfToken': get_token(request)})


@api_view()
def ping(request):
    return JsonResponse({'result': 'OK'})
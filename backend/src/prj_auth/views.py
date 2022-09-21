from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from drf_spectacular.utils import extend_schema, extend_schema_view, inline_serializer
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


@extend_schema_view(
    get=extend_schema(responses={200: inline_serializer(name='CSRFResponse',
                                                        fields={'csrfToken': serializers.CharField()}
                                                        )},
                      description="CSRFトークンを取得します"),
)
class CSRFView(APIView):
    # クッキーごとにキャッシュするのはありかもしれない
    @method_decorator(cache_page(10))
    @method_decorator(vary_on_cookie)
    def get(self, request, format=None):
        return Response({'csrfToken': get_token(request)})

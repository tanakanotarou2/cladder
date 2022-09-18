from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers, serializers, viewsets





# Routers provide an easy way of automatically determining the URL conf.
# router = routers.DefaultRouter()
# router.register(r"users", UserViewSet)

urlpatterns = [
    # path("", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api/api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    # path("api/polls/", include("polls.urls")),

    # API SCHEMA
    # ==========================================
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]

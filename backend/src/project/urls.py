from django.contrib import admin
from django.urls import include, path
from djoser.views import UserViewSet as DJOserUserViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("api/polls/", include("polls.urls")),

    # auth
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # API SCHEMA
    # ==========================================
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]

# DJOser の一部のエンドポイントだけを使用します。
user_router = routers.SimpleRouter()
user_router.register("users", DJOserUserViewSet)

# 使用するエンドポイントの URL name
enable_url_names = (
    "user-set-password",
    "user-list",
)
auth_patterns = [pat for pat in user_router.urls if pat.name in enable_url_names]

urlpatterns += [path("api/auth/", include(auth_patterns)), ]

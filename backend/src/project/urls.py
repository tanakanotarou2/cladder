from django.contrib import admin
from django.urls import include, path

from project import api_urls

urlpatterns = [
    path("admin/", admin.site.urls),
]

# api urls
urlpatterns += [
    path("api/", include(api_urls)),
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

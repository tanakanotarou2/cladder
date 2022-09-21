from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),

    # API SCHEMA
    # ==========================================
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]

from dj_rest_auth.views import (LogoutView, UserDetailsView, )

from prj_auth import views as prj_auth_views

urlpatterns += [
    path('api/login/', prj_auth_views.LoginView.as_view(), name='rest_login'),
    path('api/logout/', LogoutView.as_view(), name='rest_logout'),
    path('api/token/refresh/', prj_auth_views.RefreshView.as_view(), name='token_refresh'),
    path('api/csrf/', prj_auth_views.CSRFView.as_view()),

    path('api/user/', UserDetailsView.as_view(), name='rest_user_details'),
]

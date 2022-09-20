from dj_rest_auth.jwt_auth import get_refresh_view
from django.contrib import admin
from django.urls import path
# from djoser.views import UserViewSet as DJOserUserViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path("admin/", admin.site.urls),
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

# urlpatterns += [
#     path('dj-rest-auth/', include('dj_rest_auth.urls')),
# ]


from dj_rest_auth.views import (
    LoginView, LogoutView, UserDetailsView, )

from rest_framework_simplejwt.views import TokenVerifyView

from prj_auth import views as prj_auth_views

urlpatterns += [
    path('api/login/', LoginView.as_view(), name='rest_login'),
    path('api/logout/', LogoutView.as_view(), name='rest_logout'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('api/csrf/', prj_auth_views.CSRFView.as_view()),
    path('api/ping/', prj_auth_views.ping),

    path('api/user/', UserDetailsView.as_view(), name='rest_user_details'),
]

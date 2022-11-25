from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.serializers import LoginSerializer
from dj_rest_auth.views import LoginView as OrgLoginView
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.serializers import UserDetailSerializer
from lib.views import UseUseCaseMixin
from prj_auth.serializers import LoginResponseSerializer, RegisterUserSerializer
from prj_auth.use_cases.registration.actions import RegisterUserAction
from prj_auth.use_cases.registration.data import RegisterUserRequest


class CSRFView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        responses={200: inline_serializer(name="CsrfResponse", fields={"csrfToken": serializers.CharField()})}
    )
    def get(self, request, format=None):
        """CSRFトークンを取得します"""
        return Response({"csrfToken": get_token(request)})


class LoginView(OrgLoginView):
    # クライアントが session に認証情報を持っていても
    # 再度ログインできるように authentication をスキップしています
    authentication_classes = []  # type: ignore

    @extend_schema(
        request=LoginSerializer,
        responses=LoginResponseSerializer,
    )
    def post(self, request, *args, **kwargs):
        return super(LoginView, self).post(request, *args, **kwargs)


# デフォルトのリフレッシュクラスを取得
OrgRefreshViewCls = get_refresh_view()


class RefreshView(OrgRefreshViewCls):  # type: ignore
    # Note: アクセストークンが切れていても、リフレッシュトークンが有効期限内であれば
    # リフレッシュしたいので、authentication をスキップしています
    # 必要な認証があれば追加してください
    authentication_classes = []  # type: ignore

    def finalize_response(self, request, response, *args, **kwargs):
        res = super().finalize_response(request, response, *args, **kwargs)
        if res.status_code != 200:
            return res

        # drop tokens
        for key in ["access", "refresh"]:
            if key in res.data:
                del res.data[key]

        return res


class RegisterUserView(UseUseCaseMixin, APIView):
    """ユーザー登録"""

    @method_decorator(
        sensitive_post_parameters(
            "password",
        )
    )
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    @extend_schema(
        request=RegisterUserSerializer,
        responses=UserDetailSerializer,
    )
    def post(self, request, *args, **kwargs):
        request_serializer = RegisterUserSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)
        # Actionに処理委譲
        # dataclass を使った受け渡しのお試し実装
        # アクションには受け渡し用の dataclass を使うと dict より厳密にできるか？
        request_data = RegisterUserRequest(**request_serializer.validated_data)
        action = RegisterUserAction(request_data)
        instance = self.use_case_executor.execute(action)

        # response用のシリアライザ
        response_serializer = UserDetailSerializer(instance)
        response_data = response_serializer.data
        return Response(response_data, status=status.HTTP_201_CREATED)

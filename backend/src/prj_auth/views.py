from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LoginView as OrgLoginView
from django.middleware.csrf import get_token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class CSRFView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        """CSRFトークンを取得します"""
        return Response({"csrfToken": get_token(request)})


class LoginView(OrgLoginView):
    # クライアントが session に認証情報を持っていても
    # 再度ログインできるように authentication をスキップしています
    authentication_classes = []


# デフォルトのリフレッシュクラスを取得
OrgRefreshViewCls = get_refresh_view()


class RefreshView(OrgRefreshViewCls):  # type: ignore
    # Note: アクセストークンが切れていても、リフレッシュトークンが有効期限内であれば
    # リフレッシュしたいので、authentication をスキップしています
    # 必要な認証があれば追加してください
    authentication_classes = []

    def finalize_response(self, request, response, *args, **kwargs):
        res = super().finalize_response(request, response, *args, **kwargs)
        if res.status_code != 200:
            return res

        # drop tokens
        for key in ["access", "refresh"]:
            if key in res.data:
                del res.data[key]

        return res


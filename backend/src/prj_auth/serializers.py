from allauth.account.adapter import get_adapter
from dj_rest_auth.serializers import (
    JWTSerializerWithExpiration as OrgJWTSerializerWithExpiration,
)
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from accounts.serializers import UserDetailSerializer


class LoginResponseSerializer(OrgJWTSerializerWithExpiration):
    """ログインレスポンス"""

    # drop token
    # access_token = None
    refresh_token = None

    access_token_expiration = serializers.DateTimeField(read_only=True, help_text="アクセストークンの有効期限")
    refresh_token_expiration = serializers.DateTimeField(read_only=True, help_text="リフレッシュトークンの有効期限")

    # 行儀良くないが、schema 生成のためだけに継承
    @extend_schema_field(UserDetailSerializer)
    def get_user(self, obj):
        return super(LoginResponseSerializer, self).get_user(obj)


class RegisterUserSerializer(serializers.Serializer):
    """ユーザー登録リクエスト"""

    username = serializers.CharField(max_length=150, required=True, write_only=True)
    last_name = serializers.CharField(max_length=150, required=False, write_only=True)
    first_name = serializers.CharField(max_length=150, required=False, write_only=True)
    password = serializers.CharField(write_only=True)

    # all_auth の力を借りて validation を行います。
    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_password(self, password):
        return get_adapter().clean_password(password)

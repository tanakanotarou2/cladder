from dj_rest_auth.serializers import (
    JWTSerializerWithExpiration as OrgJWTSerializerWithExpiration,
)


class LoginSerializer(OrgJWTSerializerWithExpiration):
    """ログインレスポンス"""

    # drop token
    access_token = None
    refresh_token = None

    def __init__(self, *args, **kwargs):
        super(LoginSerializer, self).__init__(*args, **kwargs)

from accounts.models import User


class RegisterUserAction:
    """ユーザー登録アクション"""

    def __init__(self, data: dict):
        self._data = data.copy()

    def __call__(self, *args, **kwargs) -> User:
        # TODO: ユーザー登録は管理者ユーザー以外は登録できないように
        return User.objects.create_user(
            **self._data,
        )

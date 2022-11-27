from dataclasses import asdict

from accounts.models import User
from prj_auth.use_cases.registration.data import RegisterUserRequest


class RegisterUserAction:
    """ユーザー登録アクション"""

    def __init__(self, data: RegisterUserRequest):
        self._data = data

    def __call__(self, *args, **kwargs) -> User:
        # TODO: ユーザー登録は管理者ユーザー以外は登録できないように
        print("called")
        return User.objects.create_user(**asdict(self._data))

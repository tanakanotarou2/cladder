from rest_framework.serializers import ModelSerializer

from accounts.models import User


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "profile_icon"]

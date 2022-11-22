from django.apps import AppConfig


class PrjAuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "prj_auth"

    def ready(self):
        from project import container

        container.wire(modules=[".views"], packages=[".use_cases"])

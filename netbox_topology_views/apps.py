from django.apps import AppConfig


class TopologyConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "netbox_topology_views"

    def ready(self) -> None:
        import netbox_topology_views.signals  # noqa: F401

        return super().ready()

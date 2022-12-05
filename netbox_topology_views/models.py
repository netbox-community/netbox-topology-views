from pathlib import Path

from dcim.models import DeviceRole
from django.conf import settings
from django.db import models
from django.templatetags.static import static
from netbox.models.features import (
    ChangeLoggingMixin,
    ExportTemplatesMixin,
    WebhooksMixin,
)

from netbox_topology_views.utils import (
    CONF_IMAGE_DIR,
    IMAGE_DIR,
    find_image,
    image_static_url,
)


class RoleImage(ChangeLoggingMixin, ExportTemplatesMixin, WebhooksMixin, models.Model):
    objects: models.Manager["RoleImage"]

    role = models.ForeignKey(DeviceRole, on_delete=models.CASCADE)
    image = models.CharField(f"Path within the netbox static directory", max_length=255)

    def __str__(self):
        return f"{self.role} - {self.image}"

    def get_image(self) -> Path:
        """Get Icon

        returns the model's image's absolute path in the filesystem
        """
        path = Path(settings.STATIC_ROOT) / self.image

        if not path.exists():
            raise ValueError(f"{self.role} path '{path}' does not exists")

        return path

    def get_default_image(self, dir: Path = CONF_IMAGE_DIR):
        """Get default image

        will attempt to find image in given directory with any file extension,
        otherwise will try to find a `role-unknown` image

        fallback is `STATIC_ROOT/netbox_topology_views/img/role-unknown.png`
        """
        if url := find_image(self.role.slug, dir):
            return url

        # fallback to default role unknown image
        return image_static_url(IMAGE_DIR / "role-unknown.png")

    def get_image_url(self, dir: Path = CONF_IMAGE_DIR) -> str:
        try:
            self.get_image()
        except ValueError:
            return self.get_default_image(dir)
        return static(f"/{self.image}")

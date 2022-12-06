from pathlib import Path
from typing import Optional

from dcim.models import DeviceRole
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
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
    Role,
    find_image_url,
    get_model_role,
    image_static_url,
)


class RoleImage(ChangeLoggingMixin, ExportTemplatesMixin, WebhooksMixin):
    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]

    objects: "models.Manager[RoleImage]"

    image = models.CharField("Path within the netbox static directory", max_length=255)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField(null=True, blank=True)

    __role: Optional[Role] = None

    @property
    def role(self) -> Role:
        if self.__role:
            return self.__role

        model_class = self.content_type.model_class()

        if not model_class:
            raise ValueError(f"Invalid content type: {self.content_type}")

        if model_class == DeviceRole:
            device_role: DeviceRole = DeviceRole.objects.get(pk=self.object_id)
            self.__role = Role(slug=device_role.slug, name=device_role.name)
            return self.__role

        self.__role = get_model_role(model_class)
        return self.__role

    def __str__(self):
        return f"{self.role} - {self.image}"

    def get_image(self) -> Path:
        """Get Icon

        returns the model's image's absolute path in the filesystem
        raises ValueError if the file cannot be found
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
        if url := find_image_url(self.role.slug, dir):
            return url

        # fallback to default role unknown image
        return image_static_url(IMAGE_DIR / "role-unknown.png")

    def get_image_url(self, dir: Path = CONF_IMAGE_DIR) -> str:
        try:
            self.get_image()
        except ValueError:
            return self.get_default_image(dir)
        return static(f"/{self.image}")

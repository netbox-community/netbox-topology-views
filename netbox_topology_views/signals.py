from typing import Type

from dcim.models import DeviceRole
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import pre_delete
from django.dispatch import receiver

from netbox_topology_views.models import RoleImage


@receiver(pre_delete, sender=DeviceRole, dispatch_uid="delete_hanging_role_image")
def delete_hanging_role_image(sender: Type[DeviceRole], instance: DeviceRole, **kwargs):
    ct = ContentType.objects.get_for_model(sender)
    RoleImage.objects.filter(content_type=ct, object_id=instance.id).delete()

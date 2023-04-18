from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_delete
from django.dispatch import receiver
from netbox.dcim.models import DeviceRole

from netbox_topology_views.models import RoleImage


@receiver(post_delete, sender=DeviceRole, dispatch_uid="delete_hanging_role_image")
def delete_hanging_role_image(sender, instance, **kwargs):
    ct = ContentType.objects.get_for_model(instance)
    RoleImage.objects.filter(content_type=ct, object_id=instance.id).delete()

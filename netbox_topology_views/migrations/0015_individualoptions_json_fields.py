import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("netbox_topology_views", "0014_individualoptions_user_fk"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="individualoptions",
            name="legacy_user_id",
        ),
        migrations.AlterField(
            model_name="individualoptions",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="+",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="individualoptions",
            name="ignore_cable_type",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AlterField(
            model_name="individualoptions",
            name="node_label_items",
            field=models.JSONField(blank=True, default=list),
        ),
    ]

import ast
import json

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


def parse_list(value):
    try:
        parsed = ast.literal_eval(value or "[]")
    except (ValueError, SyntaxError):
        return []
    return [str(item) for item in parsed] if isinstance(parsed, (list, tuple)) else []


def convert_individual_options(apps, schema_editor):
    IndividualOptions = apps.get_model("netbox_topology_views", "IndividualOptions")
    User = apps.get_model(*settings.AUTH_USER_MODEL.split("."))
    user_ids = set(User.objects.values_list("pk", flat=True))

    for options in IndividualOptions.objects.all():
        if options.legacy_user_id not in user_ids:
            options.delete()
            continue
        options.user_id = options.legacy_user_id
        options.ignore_cable_type = json.dumps(parse_list(options.ignore_cable_type))
        options.node_label_items = json.dumps(parse_list(options.node_label_items))
        options.save()


def revert_individual_options(apps, schema_editor):
    IndividualOptions = apps.get_model("netbox_topology_views", "IndividualOptions")

    for options in IndividualOptions.objects.all():
        options.legacy_user_id = options.user_id
        options.ignore_cable_type = str(json.loads(options.ignore_cable_type or "[]"))
        options.node_label_items = str(json.loads(options.node_label_items or "[]"))
        options.save()


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("netbox_topology_views", "0013_individualoptions_draw_cable_labels"),
    ]

    operations = [
        migrations.RenameField(
            model_name="individualoptions",
            old_name="user_id",
            new_name="legacy_user_id",
        ),
        migrations.AddField(
            model_name="individualoptions",
            name="user",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="+",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.RunPython(convert_individual_options, revert_individual_options),
    ]

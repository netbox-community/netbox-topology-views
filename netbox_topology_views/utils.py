from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Type

import sys

from django.conf import settings
from django.db.models import Model
from django.templatetags.static import static
from django.utils.text import camel_case_to_spaces, re_camel_case

IMAGE_DIR = Path(settings.STATIC_ROOT) / "netbox_topology_views/img"
if sys.version_info >= (3,9,0):
    CONF_IMAGE_DIR: Path = Path(settings.STATIC_ROOT) / settings.PLUGINS_CONFIG[
        "netbox_topology_views"
    ]["static_image_directory"].removeprefix("/")
else:
    prefix = "/"
    plugin_path = settings.PLUGINS_CONFIG["netbox_topology_views"]["static_image_directory"]
    if plugin_path.startswith(prefix):
        plugin_path_new = plugin_path[len(prefix):]
        CONF_IMAGE_DIR: Path = Path(settings.STATIC_ROOT) / plugin_path_new
    else:
        CONF_IMAGE_DIR: Path = Path(settings.STATIC_ROOT) / plugin_path


def image_static_url(path: Path) -> str:
    return settings.BASE_PATH + static(
        f"/{path.relative_to(Path(settings.STATIC_ROOT))}"
    )


def get_image_from_url(url: str) -> str:
    url_path = settings.BASE_PATH + settings.STATIC_URL
    if sys.version_info >= (3,9,0):
        return url.removeprefix(url_path)
    else:
        if url.startswith(url_path):
            url_new = url[len(url_path):]
            return url_new
        else:
            return url


IMAGE_FILETYPES = (
    "apng",
    "avif",
    "bmp",
    "cur",
    "gif",
    "ico",
    "jfif",
    "jpeg",
    "jpg",
    "pjp",
    "pjpeg",
    "png",
    "svg",
    "webp",
)


def find_image_in_dir(glob: str, dir: Path):
    return next(
        (f for f in dir.glob(f"{glob}.*") if f.suffix.lstrip(".") in IMAGE_FILETYPES),
        None,
    )


@lru_cache(maxsize=50)
def find_image_url(glob: str, dir: Path = CONF_IMAGE_DIR):
    """
    will attempt to find a file that matches glob in given directory with any file extension,
    otherwise will try to find a `role-unknown` image

    returns static file url
    """
    if file := find_image_in_dir(glob, dir):
        return image_static_url(file)

    if glob != "role-unknown" and (file := find_image_in_dir("role-unknown", dir)):
        return image_static_url(file)

    if dir != IMAGE_DIR and (file := find_image_in_dir("role-unknown", IMAGE_DIR)):
        return image_static_url(file)

    return ""


@dataclass
class Role:
    slug: str
    name: str


def get_model_slug(model: Type[Model]):
    return camel_case_to_spaces(model.__name__).replace(" ", "-")


def get_model_role(model: Type[Model]) -> Role:
    return Role(
        slug=get_model_slug(model),
        name=re_camel_case.sub(r" \1", model.__name__),
    )

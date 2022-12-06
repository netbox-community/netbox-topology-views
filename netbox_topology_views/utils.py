from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from re import finditer
from typing import Type

from django.conf import settings
from django.db.models import Model
from django.templatetags.static import static
from django.utils.text import slugify

IMAGE_DIR = Path(settings.STATIC_ROOT) / "netbox_topology_views/img"
CONF_IMAGE_DIR: Path = Path(settings.STATIC_ROOT) / settings.PLUGINS_CONFIG[
    "netbox_topology_views"
]["static_image_directory"].removeprefix("/")


def image_static_url(path: Path) -> str:
    return settings.BASE_PATH + static(
        f"/{path.relative_to(Path(settings.STATIC_ROOT))}"
    )


def get_image_from_url(url: str) -> str:
    return url.removeprefix(settings.BASE_PATH + settings.STATIC_URL)


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


def camel_case_split(identifier: str):
    matches = finditer(
        ".+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)", identifier
    )
    return [m.group(0) for m in matches]


def get_model_role(model: Type[Model]) -> Role:

    return Role(
        slug=slugify(model.__name__),
        name=" ".join(camel_case_split(model.__name__)),
    )

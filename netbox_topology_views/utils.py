from functools import lru_cache
from pathlib import Path

from django.conf import settings
from django.templatetags.static import static

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
        (
            f
            for f in dir.glob(f"{glob}.*")
            if f.suffix.removeprefix(".") in IMAGE_FILETYPES
        ),
        None,
    )


@lru_cache(maxsize=50)
def find_image(glob: str, dir: Path = CONF_IMAGE_DIR):
    """
    will attempt to find a file that matches glob in given directory with any file extension,
    otherwise will try to find a `role-unknown` image
    """
    if file := find_image_in_dir(glob, dir):
        return image_static_url(file)

    if file := find_image_in_dir("role-unknown", dir):
        return image_static_url(file)

    if dir != IMAGE_DIR and (file := find_image_in_dir("role-unknown", IMAGE_DIR)):
        return image_static_url(file)

    return ""

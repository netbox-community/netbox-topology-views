from pathlib import Path

from setuptools import find_packages, setup

readme = Path(__file__).parent / "README.md"
long_description = readme.read_text()

setup(
    name="netbox-topology-views",
    version="4.0.0-beta.2",
    description="An NetBox plugin to create Topology maps",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/mattieserver/netbox-topology-views",
    author="Mattijs Vanhaverbeke",
    license="Apache 2.0",
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    keywords=["netbox-plugin"],
    classifiers=[
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3 :: Only",
    ],
    project_urls={
        "Source": "https://github.com/mattieserver/netbox-topology-views",
    },
)

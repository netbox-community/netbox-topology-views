from setuptools import setup, find_packages

from os import path
top_level_directory = path.abspath(path.dirname(__file__))
with open(path.join(top_level_directory, 'README.md'), encoding='utf-8') as file:
    long_description = file.read()

setup(
    name='netbox-topology-views',
    version='3.0.0-beta.2',
    description='An NetBox plugin to create Topology maps',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/mattieserver/netbox-topology-views',
    author='Mattijs Vanhaverbeke',
    license='Apache 2.0',
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    keywords=['netbox-plugin'],
    classifiers=[
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3 :: Only',
    ],
    project_urls={
        'Source': 'https://github.com/mattieserver/netbox-topology-views',
    },
)

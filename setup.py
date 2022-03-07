from setuptools import setup, find_packages


setup(
    name='netbox-topology-views',
    version='1.0.0-beta.1',
    description='An NetBox plugin to create Topology maps',
    url='https://github.com/mattieserver/netbox-topology-views',
    author='Mattijs Vanhaverbeke',
    license='Apache 2.0',
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    classifiers=[
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3 :: Only',
    ],
    project_urls={
        'Source': 'https://github.com/mattieserver/netbox-topology-views',
    },
)

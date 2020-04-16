# netbox-topology-views

## preview

![preview image](doc/img/preview.png?raw=true "preview")

## install

Add 'netbox_topology_views' to the PLUGINS array in your django configuration file.
Then run python3 manage.py collectstatic --no-input

There is also support for custom fiels.
If you create a custom field "coordinates" for "dcim > device" with type "text" and name "coordinates" you will see the same layout every time.

## use

go to /plugins/topology-views/ view your topologies
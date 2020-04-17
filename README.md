# Netbox Topology Views Plugin

Create topology views/maps from your devices in netbox.
Support to filter on name, site and device role.

## Preview

![preview image](doc/img/preview.png?raw=true "preview")

## Install

Run `pip install netbox-topology-views` in your virtual env.

Add 'netbox_topology_views' to the PLUGINS array in your django configuration file.  

Then run `python3 manage.py collectstatic --no-input`

### Custom field: coordinates

There is also support for custom fiels.
If you create a custom field "coordinates" for "dcim > device" with type "text" and name "coordinates" you will see the same layout every time.

## Use

Go to the plugins tab in the navbar and click topology or go to NETBOX_URL/plugins/topology-views/ view your topologies

from utilities.choices import ChoiceSet

class NodeLabelItems(ChoiceSet):
    DEVICE_NAME = 'devicename'
    DEVICE_TYPE = 'devicetype'
    ROLE = 'role'
    DESCRIPTION = 'description'
    PRIMARY_IPV4 = 'primaryipv4'
    PRIMARY_IPV6 = 'primaryipv6'
    OUT_OF_BAND_IP = 'outofbandip'
    PLATFORM = 'platform'
    SERIAL = 'serial'
    TENANT = 'tenant'
    SITE = 'site'
    LOCATION = 'location'
    RACK = 'rack'
    VIRTUAL_CHASSIS = 'virtualchassis'

    CHOICES = [
        (DEVICE_NAME, 'Device Name'),
        (DEVICE_TYPE, 'Device Type'),
        (ROLE, 'Role'),
        (DESCRIPTION, 'Description'),
        (PRIMARY_IPV4, 'Primary IPv4'),
        (PRIMARY_IPV6, 'Primary IPv6'),
        (OUT_OF_BAND_IP, 'Out-of-band IP'),
        (PLATFORM, 'Platform'),
        (SERIAL, 'Serial'),
        (TENANT, 'Tenant'),
        (SITE, 'Site'),
        (LOCATION, 'Location'),
        (RACK, 'Rack'),
        (VIRTUAL_CHASSIS, 'Virtual Chassis'),
    ]

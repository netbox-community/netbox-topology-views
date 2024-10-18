from utilities.choices import ChoiceSet

class NodeLabelItems(ChoiceSet):
    DEVICE_NAME = 'devicename'
    PRIMARY_IPV4 = 'primaryipv4'
    PRIMARY_IPV6 = 'primaryipv6'
    OUT_OF_BAND_IP = 'outofbandip'

    CHOICES = [
        (DEVICE_NAME, 'Device Name'),
        (PRIMARY_IPV4, 'Primary IPv4'),
        (PRIMARY_IPV6, 'Primary IPv6'),
        (OUT_OF_BAND_IP, 'Out-of-band IP'),
    ]

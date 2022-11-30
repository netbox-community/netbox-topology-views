# Setup Dev 
 + install docker (https://docs.docker.com/engine/install/ubuntu/)
 + install docker compose (https://docs.docker.com/compose/install/linux/)
 + install npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 + clone netbox repo
 + clone netbox_topology_views repo
 + create venv: `/usr/bin/python3 -m venv venv`
 + activate venv: `source venv/bin/activate`
 + install netbox deps, run from netbox repo: `pip3 install -r requirements.txt`
 + install build tools: `python3 -m pip install --upgrade build setuptools wheel`


# Build
 + build the package, run from netbox_topology_views repo: `python3 setup.py develop`
 + build the resources, run from static_dev folder  `npm scripts bundle`

# Test
 + copy configuration.py from dev_setup to the netbox/netbox/ folder
 + run in the netbox repo: `python3 netbox/manage.py migrate`
 + (first time only) run in the netbox repo: `python3 netbox/manage.py createsuperuser`
 + run in the netbox repo: `python3 netbox/manage.py runserver`
 + browse to http://127.0.0.1:8000
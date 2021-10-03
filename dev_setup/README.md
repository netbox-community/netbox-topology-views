# Setup Dev 
 + install docker
 + install docker compose
 + install npm
 + clone netbox repo
 + clone netbox_topology_views repo
 + create venv: `/usr/bin/python3 -m venv venv`
 + activate venv: `source venv/bin/activate`
 + install build tools: `python3 -m pip install --upgrade build setuptools wheel`
 + install deps: `pip3 install -r requirements.txt` (in the netbox folder)

# Build
 + build the package: `python3 setup.py develop`
 + build the resources `npm run resources`

# Test
 + copy configuration.py from dev_setup to the netbox/netbox/ folder
 + run in the netbox repo: `python3 netbox/manage.py migrate`
 + (first time only) run in the netbox repo: `python3 netbox/manage.py createsuperuser`
 + run in the netbox repo: `python3 netbox/manage.py runserver`
 + browse to http://127.0.0.1:8000
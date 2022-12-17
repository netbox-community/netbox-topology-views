# Setup Dev 

We will assume that you work in the folder `~/code/netbox_plugin/`, change this if you use another folder for your projects/code.

## Setup prerequisites
Make sure that you have already installed Postgresql and Redis. Also make sure that the database has already been created and privileges has been granted as described in the NetBox installation instructions at https://docs.netbox.dev/en/stable/installation/.

In short:
```
sudo apt update
sudo apt install -y postgresql
sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -u postgres psql
CREATE DATABASE netbox;
CREATE USER netbox WITH PASSWORD 'J5brHrAXFLQSif0K';
GRANT ALL PRIVILEGES ON DATABASE netbox TO netbox;

sudo apt install -y redis-server
```

## Create the base folder
```
mkdir ~/code/netbox_plugin/
cd ~/code/netbox_plugin/
```

## Install requirements
### Python + deps
You will need the following packages installed:
+ python3-venv
+ python3

Install them with your OS package manager (apt, yum, ...)

### Docker
This depends on your OS or how you want to install docker.  
See https://docs.docker.com/engine/install/ to find the install steps.

### Docker compose
This also depends on your OS, see the link below:  
https://docs.docker.com/compose/install/linux/

### NPM (with nvm)
Follow the steps on the repo below to install npm:  
https://github.com/nvm-sh/nvm#installing-and-updating


## Create venv 
```
python3 -m venv ~/code/netbox_plugin/.venvs/netbox
source ~/code/netbox_plugin/.venvs/netbox/bin/activate
```

## Setup netbox 
### Clone netbox repo
```
cd ~/code/netbox_plugin/
git clone git@github.com:netbox-community/netbox.git netbox
```
### Install deps
```
cd netbox
python3 -m pip install -r requirements.txt
```


## Setup plugin
### Clone netbox-topology-views repo
```
cd ~/code/netbox_plugin/
git clone git@github.com:mattieserver/netbox-topology-views.git plugin
```
### Install deps
```
python3 -m pip install --upgrade build setuptools wheel
```
### Copy netbox config file
```
cd ~/code/netbox_plugin/
cp plugin/dev_setup/configuration.py netbox/netbox/netbox/configuration.py
```

## Start netbox
### Start docker compose
```
cd ~/code/netbox_plugin/
cd plugin/dev_setup
docker-compose up -d
```
### Start netbox
```
cd ~/code/netbox_plugin/
source ~/code/netbox_plugin/.venvs/netbox/bin/activate
cd netbox/netbox/
python3 manage.py migrate
python3 manage.py runserver
```
You might need to create a superuser if you want to start with an empty database: `python3 manage.py createsuperuser`

# Build

## Build the plugin

```
cd ~/code/netbox_plugin/
source ~/code/netbox_plugin/.venvs/netbox/bin/activate
cd plugin/
python3 setup.py develop
``` 

## Build javascript
```
cd plugin/netbox_topology_views/static_dev
npm install
npm run bundle
``` 

### Test
You can now browse to http://localhost:8000.  
The plugin should be available in the menu.
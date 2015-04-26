#Hack_101

Installation Steps..

1) Install Git (obviously) and fetch all the code
2) Install Vietualenv with: sudo apt-get install python-virtualenv -> create a new environment with : `virtualenv env_1` -> activate it with command: `source env_1/bin/activate`
3)Install Backend dependencies with : `pip install -r requirements.txt` [NO SUDO!!]

###Installing Dependencies
1. Install npm
2. Run: `npm install`
3. Install Bower with: npm install -g bower
4. Bower: `bower install`
5. grunt watch (to check)


###Installing Backend (steps to be followed in order):
1. Mysql Server and client (Ubuntu): `sudo apt-get install mysql-server; apt-get install mysql-client`
2. Install nginx -> make two folders in it - sites-available, sites-enabled
3. Make a config file - hack101.conf and fill it with config from _config/nginx/hack101.conf
4. Follow the instruction from - http://zaiste.net/2013/03/serving_apps_locally_with_nginx_and_pretty_domains/ - to make it work. -> Restart and check
5. Run python server with: gunicorn run:app -b localhost:8000; from your workspace_root.
6. Try to run localhost:8000, if it shows some weird text, it's working.
7. Now try running http://localhost/app/?#/signup, if it doesn't show anything, it's probably working.
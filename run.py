### !env_1/bin/python
from app import app
# from werkzeug.contrib.fixers import ProxyFix
# app.wsgi_app = ProxyFix(app.wsgi_app)
# app.run(debug=True)
if __name__ == '__main__':
    app.run(port=8000,debug=True)


from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from app import views
from app.models import usermodel,edumodel,skillmodel,project_skillmodel,projectmodel,socialmodel,miscmodel,preflocmodel,jobprefmodel
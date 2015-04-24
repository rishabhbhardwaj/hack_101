import os

WTF_CSRF_ENABLED = True
SECRET_KEY = 'whatever-it-is'

basedir = os.path.abspath(os.path.dirname(__file__))

# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:ksh@localhost/hack101'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')


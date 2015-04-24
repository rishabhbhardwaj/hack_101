from app import db
class User (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(64), index = False, unique = False)
	email = db.Column(db.String(120), index = True, unique = True)
	password = db.Column(db.String(120))
	type = db.Column(db.Enum('hr','js'))
	ip = db.Column(db.String(64), index = False, unique = False)
	phone = db.Column(db.String(64), index = False, unique = False)
	gender = db.Column(db.String(64), index = False, unique = False)
	edu = db.relationship('Edu',backref='user', lazy='dynamic')
	
	def __repr__(self):
		return '<User %r>' %(self.name)

from app import db
class Users (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(64), index = False, unique = False)
	email = db.Column(db.String(120), index = True, unique = True)
	password = db.Column(db.String(120))
	location=db.Column(db.String(120))
	occupation = db.Column(db.String(64))
	age = db.Column(db.Integer)
	phone = db.Column(db.String(120))
	gender = db.Column(db.String(20))	
	
	def __repr__(self):
		return '<User %r>' %(self.name)

from app import db
class Agent (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(40), unique= False)
	contact_no = db.Column(db.String(15), unique = True)
	
	def __repr__(self):
		return '<User %r>' %(self.name)
from app import db
class Property (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name=db.Column(db.String(120))
	location=db.Column(db.String(120), index = False)
	price=db.Column(db.Integer())
	agent_id=db.Column(db.Integer, index = True, unique = True)
	area=db.Column(db.Integer)
	roi=db.Column(db.Float)
	builder_rating=db.Column(db.Float)
	negotiable=db.Column(db.Boolean)
	longitude=db.Column(db.Float, index = True, unique = True)
	latitude=db.Column(db.Float, index = True, unique = True)
	commercial=db.Column(db.Boolean)
	ethinicity=db.Column(db.String(120))

	def __repr__(self):
		return '<User %r>' %(self.name)
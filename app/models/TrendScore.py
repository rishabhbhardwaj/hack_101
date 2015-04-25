from app import db
class TrendScore (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	ques_id = db.Column(db.Integer, unique = True)
	option_id= db.Column(db.Integer)
	Airport = db.Column(db.Float, default = 0.0)
	Malls = db.Column(db.Float, default = 0.0)
	Hospitals = db.Column(db.Float, default = 0.0)
	Restraunt=db.Column(db.Float, default = 0.0)
 	School = db.Column(db.Float, default = 0.0)
	RailwayStation = db.Column(db.Float, default = 0.0)
	BusStop = db.Column(db.Float, default = 0.0)
	Bars = db.Column(db.Float, default = 0.0)
	Parks=db.Column(db.Float, default = 0.0)
	Bank=db.Column(db.Float, default = 0.0)
	PetrolPump=db.Column(db.Float, default = 0.0)
	PopulationDensity=db.Column(db.Float, default = 0.0)
	

	def __repr__(self):
		return '<User %r>' %(self.name)
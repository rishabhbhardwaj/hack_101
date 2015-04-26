from app import db
class TrendEvents (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	p_id = db.Column(db.Integer, index= True, unique= False)
	q_id = db.Column(db.Integer, index= True, unique = False)
	rating=db.Column(db.Float, index = False)
	

	def __repr__(self):
		return '<User %r>' %(self.name)
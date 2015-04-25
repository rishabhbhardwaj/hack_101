from app import db
class UserResponse (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	user_id = db.Column(db.Integer, unique= True)
	ques_id = db.Column(db.Integer, unique = True)
	response=db.Column(db.String(30), index = False)
	

	def __repr__(self):
		return '<User %r>' %(self.name)
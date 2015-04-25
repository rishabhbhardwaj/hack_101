from app import db
class SurveyQuestions (db.Model):
	id = db.Column(db.Integer, primary_key = True)
	question=db.Column(db.String(120))
	option1=db.Column(db.String(30))
	option2=db.Column(db.String(30))
	option3=db.Column(db.String(30))
	option4=db.Column(db.String(30))

	def __repr__(self):
		return '<User %r>' %(self.name)
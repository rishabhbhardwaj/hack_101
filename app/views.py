from flask import render_template, flash, redirect,jsonify,request,session
from app import app,db
from models.users import Users
from models.TrendScore import TrendScore
from models.PropertyScore import PropertyScore
from models.Property import Property
from models.SurveyQuestions import SurveyQuestions
from models.TrendEvents import TrendEvents
import math

myVec={'airport' : 0, 'malls' : 0, 'hospitals' : 0, 
		'restaurants' : 0, 'school' : 0, 'railwaystation' : 0, 
		'busstop' : 0, 'bars' : 0, 'parks' : 0, 
		'bank' : 0, 'petrolpump' : 0, 'populationdensity' : 0}

trendEventsMeta={}

pointer =0
count = 1;	
def resVector(quesid,optionVal):
	
	global myVec
	global count 
	trendScore=TrendScore.query.filter_by(ques_id=quesid, option_id=optionVal).first();

	tempVec=myVec;
	newCount=count+1;
	
	#Updating the vector with new values
	if trendScore:
		tempVec['airport']=((tempVec['airport']*count)+trendScore.Airport)/newCount;
		tempVec['malls']=((tempVec['malls']*count)+trendScore.Malls)/newCount;
		tempVec['hospitals']=((tempVec['hospitals']*count)+trendScore.Hospitals)/newCount;
		tempVec['restaurants']=((tempVec['restaurants']*count)+trendScore.Restraunt)/newCount;
		tempVec['school']=((tempVec['school']*count)+trendScore.School)/newCount;
		tempVec['railwaystation']=((tempVec['railwaystation']*count)+trendScore.RailwayStation)/newCount;
		tempVec['busstop']=((tempVec['busstop']*count)+trendScore.BusStop)/newCount;
		tempVec['bars']=((tempVec['bars']*count)+trendScore.Bars)/newCount;
		tempVec['parks']=((tempVec['parks']*count)+trendScore.Parks)/newCount;
		tempVec['bank']=((tempVec['bank']*count)+trendScore.Bank)/newCount;
		tempVec['petrolpump']=((tempVec['petrolpump']*count)+trendScore.PetrolPump)/newCount;
		tempVec['populationdensity']=((tempVec['populationdensity']*count)+trendScore.PopulationDensity)/newCount;

	#Calculating Score for property listing (rms score)
	propertyListings = PropertyScore.query.all();

	rmsScore={};

	for p in propertyListings:
		dist = (tempVec['airport']-p.Airport)**2 + (tempVec['malls']-p.Malls)**2 \
			  	+(tempVec['hospitals']-p.Hospitals)**2 + (tempVec['restaurants']-p.Restraunt)**2 \
				+(tempVec['school']-p.School)**2 + (tempVec['railwaystation']-p.RailwayStation)**2 \
				+(tempVec['busstop']-p.BusStop)**2 + (tempVec['bars']-p.Bars)**2 \
				+(tempVec['parks']-p.Parks)**2 + (tempVec['bank']-p.Bank)**2 \
				+(tempVec['petrolpump']-p.PetrolPump)**2 + (tempVec['populationdensity']-p.PopulationDensity)**2 
		dist = math.sqrt(dist);

		rmsScore[p.id] = dist
	
	
	sortedRMSscore=sorted(rmsScore.iteritems(),key=lambda (k,v):(v,k),reverse=True);
	
	print type(sortedRMSscore);
	result={}

	for key,value in sortedRMSscore:
		
		propDetail = Property.query.filter_by(id=key).first();
		result[key]={'score':value,'name':propDetail.name,'price':propDetail.price,'location':propDetail.location,
					'latitude':propDetail.latitude,'longitude':propDetail.longitude,'roi':propDetail.roi,'area':propDetail.area
					,'ethinicity':propDetail.ethinicity,'agent_id':propDetail.agent_id,'builder_rating':propDetail.builder_rating,
					'negotiable':propDetail.negotiable,'commercial':propDetail.commercial};



	myVec=tempVec;
	count=newCount;
	return result;

@app.route('/')
@app.route('/index')
def index():
	session['key'] = 'value'
	return jsonify(username=session['key'],
                   email="kshitij.mittal02@gmail.com",
                   id="7")


@app.route('/signup', methods=['POST'])
def signup():
	name=request.json['name']
	email=request.json['email']
	password=request.json['password']
	
	u = Users(name=name,
 	        email=email,
 	        password=password)

	db.session.add(u)
	db.session.commit()
	return jsonify(name=u.name,
                   email=email,
                   password=password)

@app.route('/onboarding', methods=['POST'])
def onboarding():
	cityname=request.json['cityname']
	purpose=request.json['pob']
	return jsonify(city=cityname,
					purpose=purpose)

@app.route('/login', methods=['POST'])
def login():
	email=request.json['email']
	password=request.json['password']
	user = Users.query.filter_by(email = email).first();
	if not user :
		return jsonify(result="failure")
	return jsonify(result="success")

@app.route('/fetchlistings', methods=['POST'])
def fetchlistings():
	quesid=request.json['quesid']
	optionVal=request.json['option']
	tempEntry = {"id":quesid,"option":optionVal}
	ok=0
	global pointer
	global trendEventsMeta
	for key,val in trendEventsMeta.iteritems():
		if val == tempEntry:
			ok=1
	if ok==0:
		trendEventsMeta[pointer]=tempEntry
		pointer=pointer+1
	scoreIDvector=resVector(quesid,optionVal);

	return jsonify(result=scoreIDvector);
	

@app.route('/fetchsurvey', methods=['POST'])
def fetchsurvey():
	id=request.json['id']
	sq = SurveyQuestions.query.filter_by(id=id).first();
	


	return jsonify(
		id=sq.id,
		question=sq.question,
		option1=sq.option1,
		option2=sq.option2,
		option3=sq.option3,
		option4=sq.option4,
		);


@app.route('/clickupdatescore', methods=['POST'])
def clickupdatescore():
	id=request.json['propid']
	global trendEventsMeta
	for key,val in trendEventsMeta.iteritems():
		ques_id=val['id']
		option_val=val['option']
		propertyid=id

		td_db_row=TrendEvents.query.filter_by(p_id=propertyid,q_id=ques_id).first()

		oldrating=0
		if td_db_row:
			oldrating=td_db_row.rating
			db.session.delete(td_db_row)
			db.session.commit()

		newrating = oldrating+0.1

		new_td_db = TrendEvents(p_id=propertyid,q_id=ques_id,rating=newrating)
		db.session.add(new_td_db)
		db.session.commit()

		ts_db_row=TrendScore.query.filter_by(ques_id=ques_id,option_id=option_val).first();

		property_row=PropertyScore.query.filter_by(id=ques_id).first();

		if ts_db_row and property_row:
			ts_db_row.Airport=ts_db_row.Airport+newrating*property_row.Airport-oldrating*property_row.Airport
			ts_db_row.Malls=ts_db_row.Malls+newrating*property_row.Malls-oldrating*property_row.Malls
			ts_db_row.Hospitals=ts_db_row.Hospitals+newrating*property_row.Hospitals-oldrating*property_row.Hospitals
			ts_db_row.Restraunt=ts_db_row.Restraunt+newrating*property_row.Restraunt-oldrating*property_row.Restraunt
			ts_db_row.School=ts_db_row.School+newrating*property_row.School-oldrating*property_row.School
			ts_db_row.RailwayStation=ts_db_row.RailwayStation+newrating*property_row.RailwayStation-oldrating*property_row.RailwayStation
			ts_db_row.BusStop=ts_db_row.BusStop+newrating*property_row.BusStop-oldrating*property_row.BusStop
			ts_db_row.Bars=ts_db_row.Bars+newrating*property_row.Bars-oldrating*property_row.Bars
			ts_db_row.Parks=ts_db_row.Parks+newrating*property_row.Parks-oldrating*property_row.Parks
			ts_db_row.Bank=ts_db_row.Bank+newrating*property_row.Bank-oldrating*property_row.Bank
			ts_db_row.PetrolPump=ts_db_row.PetrolPump+newrating*property_row.PetrolPump-oldrating*property_row.PetrolPump
			ts_db_row.PopulationDensity=ts_db_row.PopulationDensity+newrating*property_row.PopulationDensity-oldrating*property_row.PopulationDensity
			db.session.commit()

	return jsonify(result="success")


	


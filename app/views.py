from flask import render_template, flash, redirect,jsonify,request,session
from app import app,db
from models.usermodel import User
@app.route('/')
@app.route('/index')
def index():
	session['key'] = 'value'
	return jsonify(username=session['key'],
                   email="kshitij.mittal02@gmail.com",
                   id="7")


@app.route('/signup', methods=['POST'])
def login():
	name=request.json['name']
	email=request.json['email']
	password=request.json['password']
	
	u = User(name=name,
 	        email=email,
 	        password=password)

	db.session.add(u)
	db.session.commit()
	return jsonify(name=name,
                   email=email,
                   password=password)

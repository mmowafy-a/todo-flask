from app import app
from flask import Flask, request, jsonify
from app.models import User
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

from app.models.User import UserModel
from app.db import db
from werkzeug.security import generate_password_hash, check_password_hash


@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    
    user = UserModel.query.filter_by(EMAIL=email).first()

    if check_password_hash(user.PASSWORD, password):

        access_token = create_access_token(identity=email)
    

        return {"Token": access_token}, 200
        
    return {"error": "Invalid username or password"}, 401

@app.route('/register', methods=['POST'])
def register():

    jsonData = request.json

    hashed_pass = generate_password_hash(jsonData['password'], method='sha256')
    user = UserModel(jsonData['email'],hashed_pass)
    user.save_to_db()

    return {"message": "User created successfully"}
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)

app.config ['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@127.0.0.1:3308/todo'
app.config["JWT_SECRET_KEY"] = "EHstnR4Wbp"
jwt = JWTManager(app)

from app.resources import auth


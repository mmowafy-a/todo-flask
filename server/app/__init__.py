from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS, cross_origin
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

app.config ['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@127.0.0.1:3308/todo'
app.config["JWT_SECRET_KEY"] = "EHstnR4Wbp"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=100000)
jwt = JWTManager(app)

from app.resources import auth
from app.resources import todo_list

from app import app
from flask import Flask, request, jsonify
from app.models import User
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

from app.models.User import UserModel
from app.db import db
from server.app.models.Todo import TodoModel

@app.route('/create', methods=['POST'])
def create():
    jsonData = request.json

    title = jsonData['title']
    description = jsonData['description']
    user_id = get_jwt_identity()

    todo = TodoModel(title, description, user_id)
    todo.save_to_db()

    return {"message": "Todo created successfully"}	, 201

@app.route('/todo/<int:id>', methods=['GET'])
def get_todo(id):
    todo = TodoModel.query.filter(TodoModel.USER_ID == id).all()

    return {"TODOs": list(map(lambda x: x.json(), todo))}

@app.route('/todo/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = TodoModel.query.filter(TodoModel.ID == id).first()
    todo.delete_from_db()

    return {"message": "Todo deleted successfully"}

@app.route('/todo/<int:id>', methods=['PUT'])
def update_todo(id):
    jsonData = request.json

    title = jsonData['title']
    description = jsonData['description']

    todo = TodoModel.query.filter(TodoModel.ID == id).first()
    todo.TITLE = title
    todo.DESCRIPTION = description
    todo.save_to_db()

    return {"message": "Todo updated successfully"}
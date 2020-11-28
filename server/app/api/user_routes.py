import os
from flask import Blueprint, jsonify, request, session
from flask_jwt_extended import create_access_token
from app.models import User, db
import bcrypt

user_routes = Blueprint('users', __name__)


def set_password(password):
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt()
    )
    return hashed_password
def verify_password(password, hashed_password):
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return True
    else:
        return False

@user_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    hashed_password = set_password(data['password'])
    user = User(
        email=email,
        hashed_password=hashed_password
    )
    db.session.add(user)
    db.session.commit()
    session['user'] = user.to_dict()
    user = user.to_dict()
    return jsonify(auth_token(auth_token=auth_token, user=user))

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email).first()
    verified = verify_password(password, user.hashed_password)
    if not verified:
        return jsonify(message='Password verify failed')
    else:
        auth_token = create_access_token(
            identity={"email": user.email}
        )
    session['user'] = user.to_dict()
    user1 = user.to_dict()
    return jsonify(auth_token=auth_token, user=user1)

@user_routes.route("/logout")
def del_user():
    session.pop(user, None)
    return {'msg': 'Goodbye!'}, 200


@user_routes.route("/session")
def load_user():
  if 'user' in session:
    user = session['user']
    return {"user": session['user']}, 200
  else:
    return {"msg": "user not loaded"}, 400

from flask import Blueprint, jsonify, request, session
import bcrypt
user_routes = Blueprint('users', __name__)


def setpassword(password):
    hashed_passwoprd = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt()
    )
    return hashed_password
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
    session['musician'] = musician.to_dict()

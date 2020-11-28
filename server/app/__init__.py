import os
from flask import Flask, request, session
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate

from .config import Config
from .models import db, User, Medication
from .api.user_routes import user_routes
from .api.medication_routes import medication_routes

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(medication_routes, url_prefix='/api/medication')
db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)
login = LoginManager(app)


CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure = True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else False,
        httponly=True)
    return response

from flask import Flask, request, session
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_wtf.csrf import CSRFProtect, generate_csrf

from .config import Config

app = Flask(__name__)
app.config.from_object(Config)


jwt = JWTManager(app)
login = LoginManager(app)


CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure = True if os.environ.get('FLASK_ENV') else False
        samesite='Strict' if os.evniron.get('FLASK_ENV') else False
        httponly=True)
    return response

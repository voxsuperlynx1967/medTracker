from dotenv import load_dotenv
load_dotenv()
from app import app, db
from app.models import User, Medication
from app.api.user_routes import set_password
hashed = set_password('password')

with app.app_context():
    db.drop_all()
    db.create_all()
    Frank = User(email="frank@gmail.com", hashed_password=hashed)
    db.session.add(Frank)
    db.session.commit()
    kpin = Medication(userId=1, name="Klonopin", dosage='.5mgs', morning=True, afternoon=False, bedtime=True)
    db.session.add(kpin)
    db.session.commit()

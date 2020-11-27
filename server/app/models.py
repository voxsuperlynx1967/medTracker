from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable = False, unique = True)
    hashed_password = db.Column(db.Binary(100), nullable=False)
    meds = db.relationship('Medication', backref='users', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email
        }

class Medication(db.Model):
    __tablename__ = 'medications'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(100), nullable=False)
    morning = db.Column(db.Boolean, default=False)
    afternoon = db.Column(db.Boolean, default=False)
    bedtime = db.Column(db.Boolean, default=False)
    user = db.relationship('User', backref='medications', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "name": self.name,
            "dosage": self.dosage,
            "morning": self.morning,
            "afternoon": self.afternoon,
            "bedtime": self.bedtime,

        }

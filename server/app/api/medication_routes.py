from flask import Blueprint, jsonify, request
from app.models import db, Medication

medication_routes = Blueprint('medication', __name__)


@medication_routes.route('/<uid>', methods = ['GET', 'POST', 'DELETE'])
def all(uid):
    if request.method == 'GET':
        meds = Medication.query.filter_by(userId=uid).all()
        meddicts = [med.to_dict() for med in meds]
        return {"medication": meddicts}
    if request.method =='POST':
        data = request.get_json()
        userId = data["userId"]
        name = data["name"]
        dosage = data["dosage"]
        morning = data["morning"]
        afternoon = data["afternoon"]
        bedtime = data["bedtime"]
        med = Medication(
            userId=userId,
            name=name,
            dosage=dosage,
            morning=morning,
            afternoon=afternoon,
            bedtime=bedtime
        )
        db.session.add(med)
        db.session.commit()
        return {'msg': "success"}
    if request.method == 'DELETE':
        data = request.get_json()
        id = data["id"]
        med = Medication.query.filter_by(id=id).first()
        db.session.delete(med)
        db.session.commit()
        return {'msg': "success"}

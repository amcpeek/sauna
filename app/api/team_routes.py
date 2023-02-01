from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db, user
from app.forms import TeamForm
from .auth_routes import validation_errors_to_error_messages

team_routes = Blueprint('teams', __name__)

#Tm1 get all
#Tm2 get one
#Tm3 get current users
#Tm4 create
#Tm5 edit
#Tm6 delete
#Tm7 membership create
#Tm8 membership delete

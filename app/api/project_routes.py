from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Project

project_routes = Blueprint('projects', __name__)

#P1 get all
@project_routes.route('')
@login_required
def allProjects():
    """
    Query for all users and returns them in a list of project dictionaries
    """
    return {'Projects': [project.to_dict_full() for project in Project.query.all()]}


#P2 get one
@project_routes.route('/<int:id>')
@login_required
def projectById(id):
    # print('$$$$$$$$$$$$$$$$$$$$$can I even print this', Project[id].to_dict())
    """
    Query for a user by id and returns that user in a dictionary
    """
    project = Project.query.get(id)
    return project.to_dict_full()

#P1 get all
#P2 get one
#P3 get by user Id
#P4 create
#P5 edit
#p6 delete

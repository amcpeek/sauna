from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Project

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
@login_required
def allProjects():
    """
    Query for all users and returns them in a list of project dictionaries
    """
    return {'projects': [project.to_dict_full() for project in Project.query.all()]}


@project_routes.route('/<int:id>')
@login_required
def projectById(id):
    # print('$$$$$$$$$$$$$$$$$$$$$can I even print this', Project[id].to_dict())
    """
    Query for a user by id and returns that user in a dictionary
    """
    project = Project.query.get(id)
    return project.to_dict_full()

from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Task

task_routes = Blueprint('tasks', __name__)

# T1 get all, backend only
@task_routes.route('/')
@login_required
def allTasks():
    """
    Query for all users and returns them in a list of task dictionaries
    """
    return {'tasks': [task.to_dict() for task in Task.query.all()]}

#T2 get by task id
@task_routes.route('/<int:id>')
@login_required
def taskById(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    task = Task.query.get(id)
    return task.to_dict()

#T1 get all, backend only
#T2 get by task id
#T3 create by project id
#T4 edit by task id
#T5 delete by task id
#T6 get by user id (add in future version)

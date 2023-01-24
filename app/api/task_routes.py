from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Task

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/')
@login_required
def allTasks():
    """
    Query for all users and returns them in a list of task dictionaries
    """
    return {'tasks': [task.to_dict() for task in Task.query.all()]}


@task_routes.route('/<int:id>')
@login_required
def taskById(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    task = Task.query.get(id)
    return task.to_dict()

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Task, db, Project, User
from app.forms import TaskForm
from .auth_routes import validation_errors_to_error_messages, authenticate
# from app.api.auth_routes import authenticate #same thing

#T1 get all, backend only
#T2 get by task id
#T3 create by project id
#T4 edit by task id
#T5 delete by task id
#T6 get by user id (add in future version)
#T7 get by project id

task_routes = Blueprint('tasks', __name__, url_prefix="/api")


# PL3: Get all pledges by project id - DONE, error message done
@task_routes.route('/projects/<int:id>/tasks')
def all_tasks_by_project_id(id):
    return {"Tasks":[task.to_dict() for task in Task.query.all() if int(task.projectId) == int(id)]}

#T7 get by project id

# T1 get all, backend only
@task_routes.route('/tasks')
@login_required
def allTasks():
    # print('are we getting to the backend')
    """
    Query for all users and returns them in a list of task dictionaries
    """
    return {'Tasks': [task.to_dict() for task in Task.query.all()]}
    # return {'testing':'test'}

#T2 get by task id
@task_routes.route('/tasks/<int:id>')
@login_required
def taskById(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    task = Task.query.get(id)
    return task.to_dict()

#T3 create by project id
@task_routes.route('/projects/<int:projectId>/tasks', methods=["POST"])
@login_required
def create_task(projectId):
    form = TaskForm()
    # Authorization
    form['csrf_token'].data = request.cookies['csrf_token']
    project = Project.query.get(projectId)
    # print('KIWI', project, projectId)

    if not project:
        return {
           'message':'HTTP Error',
           "errors":["Project couldn't be found"],
           'statusCode': 404
           },404

    #Current user is project owner authentication
    #need to change this so anyone can make a task
    # if authenticate()['id'] == project.ownerId:
    if form.validate_on_submit():
        new_task = Task()
        #print('BANANA', new_task)
        form.populate_obj(new_task)
        # assign projectId
        new_task.projectId = projectId

        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()

    if form.errors:
        # print('Mango: what are form.errors', form.errors)
        return {
            "message": "Validation Error",
            "errors":validation_errors_to_error_messages(form.errors),
            "statusCode": 400,
        }, 400

    #current user is not project owner
    # else:
    #     return {
    #         "message": "Forbidden Error",
    #         'errors': ['The project does not belong to the current user'],
    #         "statusCode": 403
    #     }, 403


#T4 update
@task_routes.route('/tasks/<int:id>', methods=["PUT"])
@login_required
def update_task(id):
    form = TaskForm()
    task = Task.query.get(id)

    if not task:
        return {
            'message':'HTTP Error',
            "errors":["Task couldn't be found"],
            'statusCode': 404
            },404

    form['csrf_token'].data = request.cookies['csrf_token']
    # project = Project.query.get(task.projectId)

    #currently allowing anyone to update
    # if authenticate()['id'] == project.ownerId:
    if form.validate_on_submit():
        form.populate_obj(task)
        db.session.add(task)
        db.session.commit()
        return task.to_dict()

    if form.errors:
        return {
            "message": "Validation error",
            "errors":validation_errors_to_error_messages(form.errors),
            "statusCode": 400
        }, 400

    # else:
    #     return {
    #         "message": "Forbidden Error",
    #         'errors': ['The project is not belongs to the current user'],
    #         "statusCode": 403
    #     }, 403

#5 delete #can only delete tasks if you own the project
@task_routes.route('/tasks/<int:id>', methods=["DELETE"])
@login_required
def delete_task(id):
    task = Task.query.get(id)

    if not task:
        return {
            'message':'HTTP Error',
            "errors":["Task couldn't be found"],
            'statusCode': 404
            },404

    project = Project.query.get(task.projectId)

    # print("task.projectId", task.projectId, 'ownerId', int(authenticate()['id']), 'int(project.ownerId)', int(project.ownerId))
    if int(authenticate()['id']) == int(project.ownerId):
        db.session.delete(task)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "statusCode": 200
        }, 200

    else:
        return {
            "message": "Forbidden Error",
            'errors': ['Only the owner of the project can delete associated tasks'],
            "statusCode": 403
        }, 403

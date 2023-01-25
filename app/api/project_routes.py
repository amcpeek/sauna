from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db, user
from app.forms import ProjectForm #it wants it to be project_form, but that is not correct
from .auth_routes import validation_errors_to_error_messages

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

#P4 create
# @project_routes.route('', methods=['POST'])
# @login_required
# def create():
#     form = ProjectForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     currentId=current_user.get_id()

#     if form.validate_on_submit():
#         new_project=Project(ownerId=currentId)
#         form.populate_obj(new_project)
#         db.session.add(new_project)
#         db.session.commit()
#         return new_project.to_dict_full(),201

#     return {
#         'message':'Validation Error',
#         "errors":validation_errors_to_error_messages(form.errors),
#         'statusCode': 400
#         },400
#     pass

#P1 get all
#P2 get one
#P3 get by user Id
#P4 create
#P5 edit
#p6 delete

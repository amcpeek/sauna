from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db, user, Team, Membership
from app.forms import TeamForm, MembershipForm
from .auth_routes import validation_errors_to_error_messages

team_routes = Blueprint('teams', __name__)

#Tm1 get all
@team_routes.route('')
def allTeams():
    """
    Query for all users and returns them in a list of team dictionaries
    """
    return {'Teams': [team.to_dict_with_memberships() for team in Team.query.all()]}

#Tm2 get one
@team_routes.route('/<int:id>')
def teamById(id):
    # print('$$$$$$$$$$$$$$$$$$$$$can I even print this', Project[id].to_dict())
    """
    Query for a user by id and returns that user in a dictionary
    """
    team = Team.query.get(id)
    return team.to_dict_with_memberships()


# Tm3 get current users
# DO NOT USE THIS ROUTE, JUST USER THE MEMBERSHIP ONE
# this has 3 levels of nested dictionaries, return later
# instead on user table have get all teams
@team_routes.route("/current")
@login_required
def currents_teams():
    currentId=current_user.get_id()
    teams = [team.to_dict_with_memberships() for team in Team.query.all()]
    currentTeams = {}
    for team in teams:
        mem = team['memberships']
        for membership in mem:
            if int(membership['userId']) ==int(currentId):
                new = team['id']
                currentTeams[new]= team
    return currentTeams


#Tm4 create
@team_routes.route('',  methods=['POST'])
@login_required
def create_team():
    form = TeamForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    #get current logged in user ID
    currentId=current_user.get_id()
    print('OOOOOO', form)

    if form.validate_on_submit():
        new_team=Team(ownerId=currentId)
        form.populate_obj(new_team)
        db.session.add(new_team)
        db.session.commit()

        return new_team.to_dict_full(),201

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400

#Tm5 edit
@team_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit(id):
    form = TeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    oneTeam = Team.query.get(id)
    if not oneTeam:
        return {
            'message':'HTTP Error',
            'errors':["Team couldn't be found"],
            'statusCode': 404
        }, 404
    currentId=current_user.get_id()
    if int(oneTeam.ownerId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The team is not owned by the current user'],
          'statusCode': 403
          },403

    if form.validate_on_submit():
        form.populate_obj(oneTeam)
        db.session.add(oneTeam)
        db.session.commit()
        return oneTeam.to_dict_full()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


#Tm6 delete
@team_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_team(id):
    oneTeam = Team.query.get(id)
    if not oneTeam:
        return {
            'message':'HTTP Error',
            "errors":["Team couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int(oneTeam.ownerId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The team is not owned by the current user'],
          'statusCode': 403
          },403

    db.session.delete(oneTeam)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        'statusCode': 200
        },200

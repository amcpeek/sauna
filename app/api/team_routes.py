from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db, user, Team
from app.forms import TeamForm
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


#Tm3 get current users
# this has 3 levels of nested dictionaries, return later
#instead on user table have get all teams
@team_routes.route("/current")
@login_required
def currents_teams():
    currentId=current_user.get_id()
    teams = [team.to_dict_with_memberships() for team in Team.query.all()]
    currentTeams = []
    for team in teams:
        mem = team['memberships']
        #print( mem[0])
        for membership in mem:
            if int(membership['userId']) ==int(currentId):
                currentTeams.append(team)


            print('heyhey', membership['userId'])
            # if (int(membership.users.id)==int(currentId)):
            #     currentTeams.append(team)
    return str(currentTeams)

    # newThing = db.session.query(Team).all()
    # return { newThing }
    # return {"Teams":[team.to_dict() for team in db.session.query(Team).all() if int(team.userId)==int(currentId)]}
    # return {"Teams":[team.to_dict_with_memberships() for team in Team.query.all() if int(team.)]}


#Tm4 create
#Tm5 edit
#Tm6 delete
#Tm7 membership create
#Tm8 membership delete

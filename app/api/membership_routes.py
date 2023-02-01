from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db, user, Team, Membership
from app.forms import TeamForm, MembershipForm
from .auth_routes import validation_errors_to_error_messages


membership_routes = Blueprint('memberships', __name__, url_prefix="/api")


#M1 get all
@membership_routes.route('/memberships')
def allMemberships():
    """
    Query for all users and returns them in a list of team dictionaries
    """
    return {'Memberships': [membership.to_dict() for membership in Membership.query.all()]}



#M2 get one
@membership_routes.route('/memberships/<int:id>')
def teamById(id):
    # print('$$$$$$$$$$$$$$$$$$$$$can I even print this', Project[id].to_dict())
    """
    Query for a user by id and returns that user in a dictionary
    """
    membership = Membership.query.get(id)
    return membership.to_dict_full()


#M3 get current users memberships to teams &  projects (same at Tm3)
@membership_routes.route('memberships/current')
def currents_teams():
    currentId=current_user.get_id()
    return {"Memberships":[membership.to_dict_full() for membership in Membership.query.all() if membership.userId==int(currentId)]}



#M4 membership create
#should search first if already a member of that team
@membership_routes.route('/teams/<int:teamId>/memberships', methods=["POST"])
@login_required
def create_membership(teamId):
    form = MembershipForm()
    # Authorization
    form['csrf_token'].data = request.cookies['csrf_token']
    currentId=current_user.get_id()
    team = Team.query.get(teamId)
    print('99999999999999', team)

    if not team:
        return {
           'message':'HTTP Error',
           "errors":["Team couldn't be found"],
           'statusCode': 404
           },404

    # Current user is team creator authentication (not needed)
    #if authenticate()['id'] == project.creatorId: (not needed)
    if form.validate_on_submit():
        new_membership = Membership()

        user_member_already=Membership.query.filter(Membership.teamId==teamId).filter(Membership.userId==currentId).all()
        if user_member_already:
            return {
              'message':'Validation Error',
              "errors": "User already has membership to this team",
              'statusCode': 400
            }, 400


        new_membership=Membership(userId=currentId)
        #print('BANANA', new_reward)
        form.populate_obj(new_membership)
        # assign projectId
        new_membership.teamId = teamId

        db.session.add(new_membership)
        db.session.commit()
        return new_membership.to_dict()

    if form.errors:
        #print('Mango: what are form.errors', form.errors)
        return {
            "message": "Validation Error",
            "errors":validation_errors_to_error_messages(form.errors),
            "statusCode": 400,
        }, 400
    return {
        "not sure how we got here"
    }

#M5 membership delete
@membership_routes.route('/memberships/<int:membershipId>', methods=['DELETE'])
@login_required
def delete_membership(membershipId):
    oneMembership = Membership.query.get(membershipId)
    if not oneMembership:
        return {
            'message':'HTTP Error',
            "errors":["Membership couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int(oneMembership.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['This user is not a member of this team'],
          'statusCode': 403
          },403

    db.session.delete(oneMembership)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        'statusCode': 200
        },200

from .db import db, environment, SCHEMA, add_prefix_for_prod

class Membership(db.Model):
    __tablename__ = 'memberships'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    membershipId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    teamId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')))

    user = db.relationship("User", back_populates="memberships")
    team = db.relationship("Team", back_populates="memberships")

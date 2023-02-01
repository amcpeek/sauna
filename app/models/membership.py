from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User

class Membership(db.Model):
    __tablename__ = 'memberships'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    teamId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')))

    user = db.relationship("User", back_populates="memberships")
    team = db.relationship("Team", back_populates="memberships")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'teamId': self.teamId
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'teamId': self.teamId,
            'users':[user.to_dict() for user in User.query.all() if int(user.id)==int(self.userId)]

        }

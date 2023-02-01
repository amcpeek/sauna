from .db import db, environment, SCHEMA, add_prefix_for_prod
from .project import Project
from .user import User
from .membership import Membership


class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="teams")
    memberships = db.relationship("Membership", back_populates="team", cascade="all, delete")
    projects = db.relationship("Project", back_populates='team', cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'description': self.description
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'description': self.description,
            'owner':User.query.get(self.ownerId).to_dict(),
            'projects':[project.to_dict() for project in Project.query.all() if int(project.teamId)==int(self.id)]
        }

    def to_dict_with_memberships(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'description': self.description,
            'owner':User.query.get(self.ownerId).to_dict(),
            'projects':[project.to_dict_full() for project in Project.query.all() if int(project.teamId)==int(self.id)],
            'memberships':[membership.to_dict_full() for membership in Membership.query.all() if int(membership.teamId)==int(self.id)]

        }
    # the 2 one-to-many relationships method:
    # ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # memberId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # userOwner = db.relationship("User", foreign_keys=[ownerId])
    # userMember = db.relationship("User", foreign_keys=[memberId])

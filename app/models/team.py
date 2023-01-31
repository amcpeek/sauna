from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .project import Project

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    memberships = db.relationship("Membership", back_populates="team", cascade="all, delete")
    projects = db.relationship("Project", back_populates='team', cascade="all, delete")
    user = db.relationship("User", back_populates="teams")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'memberId': self.memberId,
            'projectId': self.projectId
        }
    # the 2 one-to-many relationships method:
    # ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # memberId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # userOwner = db.relationship("User", foreign_keys=[ownerId])
    # userMember = db.relationship("User", foreign_keys=[memberId])

from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .project import Project

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    memberId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="teams", uselist=False, foreign_keys=[ownerId, memberId])
    projects = db.relationship("Project", back_populates='team', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'projectId': self.projectId
        }

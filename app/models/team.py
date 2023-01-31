from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .project import Project

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # home_id = db.Column(db.Integer, db.ForeignKey('Teams.id'), nullable=False)
    # away_id = db.Column(db.Integer, db.ForeignKey('Teams.id'), nullable=False)

    # home_ref = db.relationship("Teams", backref="fixture", uselist=False, foreign_keys=[home_id])
    # away_ref = db.relationship("Teams", backref="fixture", uselist=False, foreign_keys=[away_id])




    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    memberId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    user = db.relationship("User", back_populates="teams", foreign_keys=[ownerId])
    user = db.relationship("User", back_populates="teams", foreign_keys=[memberId])


    id = db.Column(db.Integer, primary_key=True)
    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)


    projects = db.relationship("Project", back_populates='team', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'projectId': self.projectId
        }

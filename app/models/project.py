from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .task import Task


class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(4000), nullable=False)
    teamId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("teams.id")))


    user = db.relationship("User", back_populates="projects")
    tasks = db.relationship("Task", back_populates="project", cascade="all, delete")
    team = db.relationship("Team", back_populates="projects")

    #now different bc team owns a project, like a reward owns a pledge



    def to_dict(self):
      return {
        'id': self.id,
        'ownerId':self.ownerId,
        'name': self.name,
        'description': self.description,
        'teamId': self.teamId
      }

    def to_dict_full(self):
      return {
         'id': self.id,
        'ownerId':self.ownerId,
        'name': self.name,
        'description': self.description,
        'teamId': self.teamId,
        'owner':User.query.get(self.ownerId).to_dict(),
      }

    def to_dict_with_tasks(self):
      return {
        'id': self.id,
        'ownerId':self.ownerId,
        'name': self.name,
        'description': self.description,
        'teamId': self.teamId,
        'owner':User.query.get(self.ownerId).to_dict(),
        "tasks":[task.to_dict() for task in Task.query.all() if int(task.projectId)==int(self.id)]
      }

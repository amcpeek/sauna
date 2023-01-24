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

    user = db.relationship("User", back_populates="projects")
    tasks = db.relationship("Task", back_populates="project", cascade="all, delete")


    def to_dict(self):
      return {
        'id': self.id,
        'ownerId':self.ownerId,
        'name': self.name,
        'description': self.description
      }

    def to_dict_full(self):
      return {
         'id': self.id,
        'ownerId':self.ownerId,
        'name': self.name,
        'description': self.description,
        'owner':User.query.get(self.ownerId).to_dict(),
        "tasks":[task.to_dict() for task in Task.query.all() if int(task.projectId)==int(self.id)]
      }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
# from .project import Project


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    stageId = db.Column(db.Integer)
    assigneeId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    dueDate = db.Column(db.String(50))

    project = db.relationship("Project", back_populates="tasks")
    user = db.relationship("User", back_populates='tasks')
   # comment = db.relationship("Comment", back_populates="task", cascade="all, delete")



    def to_dict(self):
        return {
            'id': self.id,
            'projectId':self.projectId,
            'name': self.name,
            'description': self.description,
            'stageId': self.stageId,
            'assigneeId': self.assigneeId,
            'dueDate': self.dueDate
        }

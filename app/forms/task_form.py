from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired,ValidationError
from datetime import datetime


class TaskForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(message="Task must have a name")])
    description = StringField("Description")
    stageId = StringField("Stage", validators=[DataRequired(message="Task must be associated with a stage")])
    assigneeId = IntegerField("AssigneeId")

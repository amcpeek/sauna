from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Team

class TeamForm(FlaskForm):
    name = StringField('name')
    description = StringField('description')

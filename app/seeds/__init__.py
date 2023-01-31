from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .tasks import seed_tasks, undo_tasks
# from .teams import seed_teams, undo_teams



from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        #this is because the build command in Render needs to do the undo and the redo on the free tier
        undo_tasks()
        undo_projects()
        # undo_teams()
        undo_users()
    #not needed can do flask seed undo to hit this
    # undo_tasks()
    # undo_projects()
    # undo_users()

    seed_users()
    # seed_teams()
    seed_projects()
    seed_tasks()
    # Add other seed functions here


# Creates the `flask seed undo` command
#this resets the whole db
@seed_commands.command('undo')
def undo():
    undo_tasks()
    undo_projects()
    # undo_teams()
    undo_users()

    # Add other undo functions here

#put this in individual files
  # Before seeding, truncate all tables prefixed with schema name
        # db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # # Add a truncate command here for every table that will be seeded.
        # db.session.commit()

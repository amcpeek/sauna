# from app.models import db, Team, environment, SCHEMA

# def seed_teams():
#     t1 = Team(name='Customer Success & Implementation Team',
#     description='Support customers implementing the process of at home remote tutoring and renewing contracts with districts',
#     ownerId=1)
#     t2 = Team(name='Engineering', description='Create the app used by customers and internal employees',
#     ownerId=2)

#     db.session.add(t1)
#     db.session.add(t2)
#     db.session.commit()
# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_teams():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM teams")

#     db.session.commit()

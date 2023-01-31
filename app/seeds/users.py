from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    u1 = User(
        username='Annika', email='annika@aa.io', password='passwordAnnika')
    u2 = User(
        username='Bob', email='bob@aa.io', password='passwordBob')
    u3 = User(
        username='Colleen', email='colleen@aa.io', password='passwordColleen')
    u4 = User(
        username='David', email='david@aa.io', password='passwordDavid')
    u5 = User(
        username='Erik', email='erik@aa.io', password='passwordErik')
    u6 = User(
        username='Fredrik', email='fredrik@aa.io', password='passwordFredrik')
    u7 = User(
        username='Grace', email='grace@aa.io', password='passwordGrace')
    u8 = User(
        username='Henrik', email='henrik@aa.io', password='passwordHenrik')


    db.session.add(u1)
    db.session.add(u2)
    db.session.add(u3)
    db.session.add(u4)
    db.session.add(u5)
    db.session.add(u6)
    db.session.add(u7)
    db.session.add(u8)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

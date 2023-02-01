from app.models import db, Membership, environment, SCHEMA

def seed_memberships():
    m1 = Membership(userId=1, teamId=1)
    m2 = Membership(userId=2, teamId=1)
    m3 = Membership(userId=3, teamId=1)
    m4 = Membership(userId=4, teamId=1)

    m5 = Membership(userId=5, teamId=2)
    m6 = Membership(userId=6, teamId=2)
    m7 = Membership(userId=7, teamId=2)
    m8 = Membership(userId=8, teamId=2)

    m9 = Membership(userId=1, teamId=2)
    m10 = Membership(userId=5, teamId=1)

    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.add(m4)
    db.session.add(m5)
    db.session.add(m6)
    db.session.add(m7)
    db.session.add(m8)
    db.session.add(m9)
    db.session.add(m10)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM memberships")

    db.session.commit()

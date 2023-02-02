from app.models import db, Project, environment, SCHEMA

def seed_projects():
    p1=Project(ownerId=1, teamId=1, name='Document Renewal Process', description='Each sub team has created their own processes and we need to collaborate to unite them')
    p2=Project(ownerId=2, teamId=1, name='Market to Parents', description='Market at home tutoring to parents of the customer district')
    p3=Project(ownerId=5, teamId=2, name='Create new district admin user type', description='Update database structure and UI so district admin can update students in all their associated schools')
    p4=Project(ownerId=6, teamId=2, name='Build an internal parent sign up page', description='Create a method for implementation team to create a unique sign up form experience to meet district needs')

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;") #postgres need something different
        #bc identify auto-increments, want to set back to 1
    else:
        db.session.execute("DELETE FROM projects") #local command sqlite

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.



#seed data with sci dept
    # project1=Project(ownerId=1,name='Select new science curriculum',
    # description='Review 4 curriculums with teachers and the board')
    # project2=Project(ownerId=1, name='Applying for the State funding',
    # description='Work with Oakland STEM schools to write a grant for additional funding')
#v1 implementation team data
    # project3=Project(ownerId=2, name='Piloting new remote literacy tutoring',
    # description="Partner with an external tutor provider company and Oakland school district")
    # project4=Project(ownerId=2, name='Hire and onboard implementation team members',
    # description='Work with HR to create a hiring, onboarding, and continual coaching process.')

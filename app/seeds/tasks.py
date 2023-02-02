from app.models import db, Task, environment, SCHEMA


def seed_tasks():
    t1=Task(assigneeId=1, projectId=1, name='Meet with team leads to review renewal process',
    description='After meeting with all team leads, work with each one to get all the current documentation on renewal processes', stageId=1)
    t2=Task(assigneeId=2, projectId=1, name='Review all documentation of current renewal processes',
    description='Collaborate with team members and comment on Google docs which aspects are best to keep from each system', stageId=2)
    t3=Task(assigneeId=3, projectId=2, name='Get assessment data', description='Work with school district to get reading levels for students that will participate in at home small group tutoring', stageId=1)
    t4=Task(assigneeId=4, projectId=2, name='Send communications to parents for sign up', description='Mass text and email all eligible families in the district', stageId=2)

    t5=Task(assigneeId=5, projectId=3, name='Design new database schema', description='Review the minimum amount of change necessary to add a new permission type', stageId=1)
    t6=Task(assigneeId=6, projectId=3, name='Test new feature in development',
    description='Confirm if changes to the database schema cause any issues with the user being able to view what they previously had access to as school admins', stageId=2)
    t7=Task(assigneeId=7, projectId=4, name="Research parent's desires for the sign up form", description="Review parent and school leader's survey feedback on the current process", stageId=1)
    t8=Task(assigneeId=8, projectId=4, name='Meet with Customer Success and Implementation team leaders', description='Discuss the issues with the current Google and Word Press sign up form processes', stageId=2)

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()


    # task1=Task(projectId=1, name='Curriculum Reviewing Event',
    # description='Invite teachers across the district to review curriculum at the science dept', stageId=1 )
    # task2=Task(projectId=1, name='School Board Meeting to Select Curriculum',
    # description='Analyze the result from the teacher curriculum viewing event', stageId=2 )
    # task3=Task(projectId=1, name='Finalize purchase of curriculum with curriculum company',
    # description='Go over the budge internally with the district and sign contract with the curriculum company', stageId=3 )
    # task4=Task(projectId=1, name='Plan for teacher leaders to be trained in the new curriculum',
    # description='Work with school district to create a summer training program for teacher leaders', stageId=1 )
    # task5=Task(projectId=2, name='Review grant application',
    # description='Evaluate if our school can meet the restrictions of the grant application', stageId=1 )
    # task6=Task(projectId=2, name='Create budget for grant application',
    # description='Develop a list of all items we would like to purchase', stageId=2 )
    # task7=Task(projectId=2, name='Get permission from parents to include photos of students',
    # description='Photos are required for the application, and the form to get parents to consent in on the website', stageId=3 )
    # task8=Task(projectId=2, name='Write the application content and get the grant reviewed',
    # description='Ask another team member to review the content of the application.', stageId=1 )
    # db.session.add(task1)
    # db.session.add(task2)
    # db.session.add(task3)
    # db.session.add(task4)
    # db.session.add(task5)
    # db.session.add(task6)
    # db.session.add(task7)
    # db.session.add(task8)

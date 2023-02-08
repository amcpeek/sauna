from app.models import db, Task, environment, SCHEMA


def seed_tasks():
    #T1
    #P1 owner = 1
    t1=Task(assigneeId=1, projectId=1, name='Meet with team leads to review renewal process',
    description='After meeting with all team leads, work with each one to get all the current documentation on renewal processes', stageId=1, dueDate='2023-05-01')
    t2=Task(assigneeId=2, projectId=1, name='Review all documentation of current renewal processes',
    description='Collaborate with team members and comment on Google docs which aspects are best to keep from each system', stageId=2, dueDate='2023-05-03')
    t3=Task(assigneeId=3, projectId=1, name='Create the new renewal system', description='One master document that links to any other needed resources', stageId=2, dueDate='2023-05-05')
    t4=Task(assigneeId=4, projectId=1, name='Meet with key stake holders again to review the new process',
    description='Create a shared calendar invite', stageId=3, dueDate='2023-05-07')
    t5=Task(assigneeId=1, projectId=1, name='Review feedback on new system', description='Take the feedback and build it into the final document', stageId=1, dueDate='2023-05-09')
    t6=Task(assigneeId=1, projectId=1, name='Train the entire team on the new system', description='In the next monthly team wide meeting train all team members', stageId=2, dueDate='2023-05-11')

    #P2 owner = 1
    t7=Task(assigneeId=1, projectId=2, name='Get assessment data', description='Work with school district to get reading levels for students that will participate in at home small group tutoring', stageId=1, dueDate='2023-05-02')
    t8=Task(assigneeId=2, projectId=2, name='Send communications to parents for sign up', description='Mass text and email all eligible families in the district', stageId=1, dueDate='2023-05-04')
    t9=Task(assigneeId=3, projectId=2, name='Review sign up responses', description='Use excel to filter sign up responses and match to confirm families are eligible', stageId=1, dueDate='2023-05-06')
    t10=Task(assigneeId=4, projectId=2, name='Match student assessment data to parent sign ups', description='Using excel and SQL match student data to confirm they are enrolled', stageId=2, dueDate='2023-05-08')
    t11=Task(assigneeId=1, projectId=2, name='Send student enrollment information to our partnering company', description='Clean data before it is sent to the partnering company', stageId=2, dueDate='2023-05-10')
    t12=Task(assigneeId=1, projectId=2, name="Inform parents of their student's tutoring time slot", description='Send mass text and emails to families', stageId=3, dueDate='2023-05-12')

    #T2
    #P3 owner = 5
    t13=Task(assigneeId=5, projectId=3, name='Design new database schema', description='Review the minimum amount of change necessary to add a new permission type', stageId=1, dueDate='2023-06-01')
    t14=Task(assigneeId=6, projectId=3, name='Test new feature in development',
    description='Confirm if changes to the database schema cause any issues with the user being able to view what they previously had access to as school admins', stageId=1, dueDate='2023-06-02')
    t15=Task(assigneeId=7, projectId=3, name='Create new user type', description='Write the code necessary to create an additional user time', stageId=2, dueDate='2023-06-05')
    t16=Task(assigneeId=8, projectId=3, name='Review what competitors have for their user types', description='Compare other tutoring ed tech platforms user types', stageId=2, dueDate='2023-06-08')
    t17=Task(assigneeId=5, projectId=3, name='Engage in user research', description='Interview current customers and potential customers about what they are most interested in for user types', stageId=3, dueDate='2023-06-16')
    t18=Task(assigneeId=6, projectId=3, name='Discuss with CS and Implementation team leaders', description='Meet with CS and Implementation Teams to discover what user types they need the most currently', stageId=3, dueDate='2023-07-01')

    #P4 owner = 6
    t19=Task(assigneeId=5, projectId=4, name="Research parent's desires for the sign up form", description="Review parent and school leader's survey feedback on the current process", stageId=1, dueDate='2023-05-02')
    t20=Task(assigneeId=6, projectId=4, name='Meet with Customer Success and Implementation team leaders', description='Discuss the issues with the current Google and Word Press sign up form processes', stageId=1, dueDate='2023-05-07')
    t21=Task(assigneeId=7, projectId=4, name='Review the current systems in Wordpress, Salesforce, and Google Suite', description='''Meet with Implementation and integration team leaders to review the current tools used
    internally and with our external tutoring provider''', stageId=1, dueDate='2023-05-09')
    t22=Task(assigneeId=8, projectId=4, name='Build the internal version of the sign up form in app', description='Code the new form', stageId=2, dueDate='2023-05-12')
    t23=Task(assigneeId=5, projectId=4, name='Test the new form in QA', description='Have implementation team members test it', stageId=3, dueDate='2023-05-14')
    t24=Task(assigneeId=6, projectId=4, name='Test the form with parents', description='Confirm parents that speak the languages most common amongst customers can navigate the sign up form', stageId=3, dueDate='2023-05-18')

     #T3
     #P5 owner = 9
    t25=Task(assigneeId=9, projectId=5, name='Create a webpage with all sign up information', description='Include company logo and district logo', stageId=1, dueDate='2023-07-01')
    t26=Task(assigneeId=10, projectId=5, name='Make sure all marketing material are in families home languages', description='Connect with implementation team to plan for most common languages', stageId=2, dueDate='2023-07-01')
    t27=Task(assigneeId=11, projectId=5, name='Design flyers with QR codes schools can hand out to parents', description='Develop black and white and color options', stageId=3, dueDate='2023-07-06')
    t28=Task(assigneeId=12, projectId=5, name='Write clear texting templates for parents', description='Confirm the allowed character length. Create versions for each needed language', stageId=3, dueDate='2023-07-09')
    t29=Task(assigneeId=9, projectId=5, name='Test the effectiveness of the marketing materials', description='Share flyers, texts, and websites with parents in the districts served to confirm it make sense to them and interests them', stageId=3, dueDate='2023-07-14')
    t30=Task(assigneeId=10, projectId=5, name='Review competitors marketing material', description='Confirm it is clear how this project is different from the many others being offered currently to the exact parents', stageId=3, dueDate='2023-07-17')

    #P6 owner = 10
    t31=Task(assigneeId=9, projectId=6, name='Review ed tech competitors' , description='Review competitors also eligible for the same state funding', stageId=1, dueDate='2023-05-05')
    t32=Task(assigneeId=10, projectId=6, name='Work with current partnering districts to advocate for the product', description='Have current California districts quotes on the company website and marketing materials', stageId=1, dueDate='2023-05-06')
    t33=Task(assigneeId=11, projectId=6, name='Ask current customers to speak with potential new customers', description='If a new district is interested, they may request to speak with a current customer', stageId=2, dueDate='2023-05-08')
    t34=Task(assigneeId=12, projectId=6, name='Find organizations willing to supplement the funding', description='Connect with current non-profit partners who have relationships with California districts', stageId=2, dueDate='2023-05-11')
    t35=Task(assigneeId=9, projectId=6, name="Assign SDR's call districts", description='Begin focusing on districts surrounding current partners', stageId=3, dueDate='2023-05-14')
    t36=Task(assigneeId=10, projectId=6, name='Visit Ed Tech conferences in California', description='Be prepared to table at as many upcoming conferences as possible', stageId=3, dueDate='2023-05-17')

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.add(t10)
    db.session.add(t11)
    db.session.add(t12)
    db.session.add(t13)
    db.session.add(t14)
    db.session.add(t15)
    db.session.add(t16)
    db.session.add(t17)
    db.session.add(t18)
    db.session.add(t19)
    db.session.add(t20)
    db.session.add(t21)
    db.session.add(t22)
    db.session.add(t23)
    db.session.add(t24)
    db.session.add(t25)
    db.session.add(t25)
    db.session.add(t26)
    db.session.add(t27)
    db.session.add(t28)
    db.session.add(t29)
    db.session.add(t30)
    db.session.add(t31)
    db.session.add(t32)
    db.session.add(t33)
    db.session.add(t34)
    db.session.add(t35)
    db.session.add(t35)
    db.session.add(t36)

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

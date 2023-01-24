# Guava
## an Asana Clone by Annika McPeek

## Link to live site:
https://guava.onrender.com/ (currently available, haven't set up yet)

## Description:
My clone of Asana will have have features to manage tasks as a team.

## Technologies used:
The backend uses SqlAlchemy and Flask in Python. The frontend uses React and Redux in Javascript. The live site is on Render and uses PostgreSQl and locally the database is SQLite.
## Usage description of features.

## Home Page:
Brief description of what Guava is.
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eabe2e45a4_0_37
![]()

## Kanban Board:
View one projects tasks all together.
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eabe2e45a4_0_12
![]()

## Task Details and Comments:
Edit tasks here and comment between team members (anyone who joined a project).
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eabe2e45a4_0_18
![]()

## Create Project Page:
A project owner can CRUD a project. Any user can join any project and view it.
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eabe2e45a4_0_48
![]()

## Create Task Page:
This form is where a user can CRUD their task if they are part of the project.
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eabe2e45a4_0_53
![]()


## Side Bar:
View your projects and team members of each project. Switch between viewing different projects.
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eabe2e45a4_0_43
![]()

## List View of Tasks:
The same tasks shown on a list instead of Kanban board.
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eac8dcd966_1_0
![]()

## Customer Facing Version of a Timeline:
For projects with frequently changing timelines that need to be shared between organizations, this feature can help a partnering organization have one reference place for updated task timelines.
https://docs.google.com/presentation/d/1_kyjjRIa4gab2SOSWLB3iPyOkDjcBhPFZ6-TlQAcegQ/edit#slide=id.g1eabe2e45a4_0_30t

![]()


## Road Map
After creating full CRUD for projects, tasks, teams, and comments, I want to add drag and drop on the Kanban board, a list version of the tasks, dependencies between tasks, and a customer facing version of the timeline.

## Get started using my repo locally
Once downloading the repo in the top level run:
pipenv install
pipenv shell
flask db upgrade
flask seed all
flask run

In the frontend folder run:
npm install
npm start


## Contact Me:
Annika McPeek
ammcpeek@gmail.com
linkedin.com/in/annika-mcpeek/

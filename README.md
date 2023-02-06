# Sauna
## an Asana Clone by Annika McPeek

## Link to live site:
https://sauna.onrender.com/

## Description:
My clone of Asana will have have features to manage tasks as a team.

## Technologies used:
The backend uses SqlAlchemy and Flask in Python. The frontend uses React and Redux in Javascript. The live site is on Render and uses PostgreSQl and locally the database is SQLite.

## Selected pages:

## Splash Page:
Brief description of what Sauna is.
![](https://github.com/amcpeek/sauna/blob/main/imagesGithub/saunaSplash.png)

## Profile Page:
View all of the users tasks, projects, and teams on one page.
![](https://github.com/amcpeek/sauna/blob/main/imagesGithub/saunaProfile.png)


## Kanban Board and creating a task:
View one projects tasks all together. This form is where a user can create, update, delete, and assign tasks to team members.
![](https://github.com/amcpeek/sauna/blob/main/imagesGithub/saunaKanban.png)

## Editing a task and assign it to a team member:
One the Kanban board view, a user can reassign task to team members and edit a tasks information.
![](https://github.com/amcpeek/sauna/blob/main/imagesGithub/saunaEditTask.png)


## List View of Tasks:
The same tasks shown on a list instead of Kanban board.
![](https://github.com/amcpeek/sauna/blob/main/imagesGithub/saunaListView.png)

## View a Team Page:
From this page a user can see information about a team, join a team if they are not part of it, and create a new project
![](https://github.com/amcpeek/sauna/blob/main/imagesGithub/saunaTeamPage.png)


## Edit Team Page:
A team owner can create, update, and delete a team, and a project owner can do the same for their projects. Any user can join any team and it's associated projects.
![](https://github.com/amcpeek/sauna/blob/main/imagesGithub/saunaEditTask.png)




## Road Map
# Include dates for tasks
# Include dependences between tasks. One task cannot be started until another task finishes
# Customer facing version of projects on a separate unique link. Log in not required to view this page.

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

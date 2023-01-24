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



# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/users` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/session` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/session` and `/users` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying projects.


##

### Create Project

* As a logged in user, I want to be able to create new projects.
  * When I'm on the `/project/create' page:
    * I can create and submit a new project to the main page:
      * So that other users can find my project and join it to work on tasks on it.

### Viewing Projects

* As a logged in/out user, I want to be able to view projects available for me to chose to join.
  * When I'm on the `/` page:
    * I can view all of the projects available to join:
      * So that I can select one and work on tasks on it.

* As a logged in/out user, I want to be able to view a single project and its tasks and comments.
  * When I'm on the `/project/:projectId` page:
    * I can view the content of the Project, as well as the associated tasks and comments.
      * So that I can read the project details and interact with the tasks and comments.

### Updating Projects

* As a logged in user, I want to be able to edit my own Projects by clicking an Edit button associated with the Project.
  * When I'm on the `/project/:projectId/edit`:
    * I can click "Edit" to make permanent changes to Project I have posted.
      * So that I can fix any errors I make in my Project.

### Deleting Project

* As a logged in user, I want to be able to delete my Project by clicking a Delete button associated with the Project.
  * When I'm on the `/project/:projectId/edit`:
    * I can click "Delete" to permanently delete a Project I have posted, and any associated tasks and comments.
      * So that when I realize my project is not longer happening I can get rid of it.

##


### Create Tasks

* As a logged in user, I want to be able to create new tasks to other users projects or my own projects.
  * When I'm on the `/project/:projectId/task/create` page:
    * I can create and submit a new task to the project page:
      * So that I be part of the productivity of the task


### Viewing Tasks

* As a logged in user, I want to be able to view all the tasks associated with the project I am viewing.
  * When I'm on the `/project/:projectId` page:
    * I can view all of the tasks connected to this project, and what stage in the project life cycle they are at (incoming request, in progress, completed)
      * So that I can read and interact with all of the tasks listed.


### Updating Tasks

* As a logged in user, I want to be able to edit my tasks by clicking an Edit button associated with the task connected to the project.
  * When I'm on the `/project/:projectId/task/:taskId/edit`:
    * I can click "Edit" to make permanent changes to one task associated with this project, even if I did not create the task.
    * I can change the stage of the project life cycle a task is at in a drop down (incoming request, in progress, completed)
      * So that I can update any changes to that particular task.

### Deleting Tasks

* As a logged in user, I want to be able to delete a task by clicking a Delete button associated with the task connected with the project.
  * When I'm on the `/project/:projectId/task/:taskId/edit`:
    * I can click "Delete" to permanently delete a task, and the associated comments
      * So that if I realize this task does not need be to done.

##


### Create Comments

* As a logged in user, I want to be able to create new comment on a task connected to a project.
  * When I'm on the `/projects/:projectId/task/:taskId/comment/create` page:
    * I can create and submit a new comment to the task on the project page I am on:
      * So that I can communicate to team members information about the completion of the task


### Viewing Comments

* As a logged in user, I want to be able to view all the comments on the task associated with the project I am viewing.
  * When I'm on the `/project/:projectId/task/:taskId` page:
    * I can view all of the comments associated with a task
      * So that I can read and interact with all of the tasks and it's comments listed.


### Updating Comments

* As a logged in user, I want to be able to edit my tasks by clicking an Edit button associated with the task connected to the project.
  * When I'm on the `/project/:projectId/task/:taskId/comment/:commentId`:
    * I can click "Edit" to make permanent changes to one comment associated with this task, only if I created this comment.
      * So that I can update any changes to that particular task.

### Deleting Comments

* As a logged in user, I want to be able to delete a comment I created by clicking a Delete button associated with the comment connected with the task.
  * When I'm on the `/project/:projectId/task/:taskId/comment/:commentId`:
    * I can click "Delete" to permanently delete a comment, but not the associated task or project.
      * If I realize my comment was not helpful.

##


### Create Team Membership

* As a logged in user, if I want to join a project, I need to join a team before being able to interact with the tasks and comments.
  * When I'm on the `/projects/:projectId/join` page:
    * I can join any team, there are not restrictions on which teams I can join, I do not need anyone's permission to join a team:
      * So that I can interact with tasks and comments within the project.


### Viewing Teams Members

* As a logged in user, I want to view all of my team mate working on a project with me
  * When I'm on the `/project/:projectId/` page:
    * I can view all of my team members
      * So that I can get to know my team I am working with.


### Assigning Tasks to Team Members
* As a logged in user and member of a team, I can assign tasks to team members on my project
  * When I'm on the `/project/:projectId/task/:taskId/edit` page:
    * I can select a team member for a task from a drop down list
      * So that I can be productive with my team and split tasks effectively.


### Deleting Your Team Membership

* As a logged in user, if I decide I no longer want to be part of a team, I can leave the team
  * When I'm on the `/project/:projectId/leave`:
    * I can click "Leave Project & Team" to lose access to team membership of that project.
      * If I realize I do not want to be part of that team

##


# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

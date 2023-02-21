import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation/NavBar'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/auth/UsersList';
import User from './components/auth/User';
import { authenticate } from './store/session';
import ViewProject from './components/Projects/ViewProject'
import ViewAllProjects from './components/Projects/ViewAllProjects';
import ProjectEntry from './components/Projects/ProjectEntry';
import TaskEntry from './components/Tasks/TaskEntry'
import ViewTask from './components/Tasks/ViewTask'
import WhySauna from './components/Navigation/whySauna';
import ViewCurrentTeams from './components/Team/ViewCurrentTeams'
import PageNotFound from './components/Navigation/PageNotFound';
import SplashPage from './components/Navigation/SplashPage'
import ViewAllTeams from './components/Team/ViewAllTeams';
import ViewTeam from './components/Team/ViewTeam'
// import NewTeam from './components/Team/NewTeam';
// import NewProfile from './components/Team/NewProfile';
import NewAllTeams from './components/Team/NewAllTeams';
import DndProject from './components/dnd/dndProject'
import NewViewProject from './components/Projects/NewViewProject';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/' exact={true}>
          <SplashPage/>
        </Route>
        <ProtectedRoute path='/profile'>
          <ViewCurrentTeams/>
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/whySauna'>
          <WhySauna/>
        </Route>

        <Route path='/projects'exact={true} >
          <ViewAllProjects/>
        </Route>
        <Route path='/projects/:id'exact={true} >
          <ViewProject/>
        </Route>
        <Route path='/projects/:projectId/tasks/:taskId'exact={true} >
          <ViewTask/>
        </Route>
        <ProtectedRoute path={['/projects/create','/projects/:id/edit']} >
          <ProjectEntry />
        </ProtectedRoute>
        <ProtectedRoute path={['/projects/:projectId/tasks/create','/tasks/:taskId/edit']} >
          <ProjectEntry />
        </ProtectedRoute>

        <Route path='/teams' exact={true}>
          <ViewAllTeams/>
        </Route>
        <Route path='/teams/:id' exact={true}>
          <ViewTeam/>
        </Route>

        <Route path='/newallteams' exact={true}>
          <NewAllTeams/>
        </Route>
        <Route path='/dnd' exact={true}>
          <DndProject/>
        </Route>
        <Route path='/newprojects/:id'exact={true} >
          <NewViewProject/>
        </Route>





        <Route >
            <PageNotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

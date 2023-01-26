import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ViewProject from '../src/components/Projects/ViewProject/index'
import ViewAllProjects from './components/Projects/ViewAllProjects/index';
import ProjectEntry from './components/Projects';
import ViewTask from './components/Tasks/ViewTask/index'

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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path={['/projects/create','/projects/:id/edit']} >
          <ProjectEntry />
        </ProtectedRoute>
        {/* <Route path='/projects'exact={true} >
          <ViewAllProjects/>
        </Route> */}
        <Route path='/projects/:id'exact={true} >
          <ViewProject/>
        </Route>
        <Route path='/projects/:projectId/tasks/:taskId'exact={true} >
          <ViewTask/>
        </Route>

        <ProtectedRoute path={['/','/projects']} exact={true} >
          <ViewAllProjects/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

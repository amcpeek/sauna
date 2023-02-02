import React from 'react';
import { Route,Switch } from 'react-router-dom';
import CreateTeam from './CreateTeam';
import EditTeam from './EditTeam';
// import './Teams.css'


const TeamEntry=()=>{

    return (
        <div>
            <Switch>
            <Route exact path={'/teams/:id/edit'}>
            <EditTeam/>
            </Route>
            <Route exact path={'/teams/create'}>
            <CreateTeam/>
            </Route>
            </Switch>
        </div>
    )
}

export default TeamEntry

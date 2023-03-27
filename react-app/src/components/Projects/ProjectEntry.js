import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateProject from "./CreateProject";
import EditProject from "./EditProject";
// import './Projects.css'

const ProjectEntry = () => {
  return (
    <div>
      <Switch>
        <Route exact path={"/projects/:id/edit"}>
          <EditProject />
        </Route>
        <Route exact path={"/projects/create"}>
          <CreateProject />
        </Route>
      </Switch>
    </div>
  );
};

export default ProjectEntry;

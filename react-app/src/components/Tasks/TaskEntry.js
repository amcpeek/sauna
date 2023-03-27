import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";

const TaskEntry = () => {
  return (
    <div>
      <Switch>
        <Route path={"/tasks/:taskId/edit"}>
          <EditTask />
        </Route>
        <Route exact path={"/projects/:projectId/tasks/create"}>
          <CreateTask />
        </Route>
      </Switch>
    </div>
  );
};

export default TaskEntry;

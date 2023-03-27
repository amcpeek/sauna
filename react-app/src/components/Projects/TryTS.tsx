import * as React from "react";
import * as ReactDOM from "react-dom";
import { fetchOneProject } from "../../store/project";
import { getAllTasksByProjectId } from "../../store/task";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import arrayOfColors from "../../assets/ArrayOfColors";

interface RootState {
  project: {
    [key: string]: {
      id: number;
      name: string;
      description: string;
      ownerId: number;
      teamId: number;
      owner: {
        id: number;
        username: string;
        email: string;
      };
    };
  };
  task: {
    ["tasksByProjectId"]: {
      [key: string]: {
        [key: string]: {
          id: number;
          name: string;
          description: string;
          assigneeId: number;
          dueDate: string;
          stageId: number;
          projectId: number;
        };
      };
    };
  };
}

const TryTS = () => {
  type testParams = { id: string };
  const { id } = useParams<testParams>();
  const dispatch = useDispatch();
  const findProjectTest = async () => {
    const returnProject = await dispatch(fetchOneProject(id));
    const returnTasks = await dispatch(getAllTasksByProjectId(id));
  };
  React.useEffect(() => {
    findProjectTest();
  }, [dispatch]);
  let oneProject = useSelector((state: RootState) => state.project[id]);
  let allTasksByProg = useSelector(
    (state: RootState) => state.task.tasksByProjectId
  );
  let allTasksByProgArr: any[] | undefined;
  if (allTasksByProg) {
    allTasksByProgArr = Object.values(allTasksByProg[id]);

    allTasksByProgArr.sort((a, b) =>
      new Date(a.dueDate) > new Date(b.dueDate)
        ? 1
        : new Date(b.dueDate) > new Date(a.dueDate)
        ? -1
        : 0
    );

    // allTasksByProgArr.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    //allTasksByProgArr.sort((a,b) => a.id - b.id); // b - a for reverse sort
    console.log("allTasksByProgArr", allTasksByProgArr);
  }

  if (oneProject) {
    return (
      <div>
        <div className="f width-100-per jc-c">
          <div className="col lr-margin-med">
            <div className="c-t-top">
              <h1 className="text-blue">
                {oneProject.name} Project Implemenation
              </h1>
              <h3>{oneProject.description}</h3>
              <div className="text-blue">Contact Us:</div>
              <div>
                {oneProject.owner && oneProject.owner.username}, Project Leader
              </div>
              <div>{oneProject.owner && oneProject.owner.email}</div>
            </div>

            <div className="row jc-st margin-t-2">
              <div className="c-t-name">
                <div className="l-margin-small">
                  <h3>Task</h3>
                </div>
              </div>
              <div className="c-t-description">
                <div className="l-margin-small">
                  <h3>Description</h3>
                </div>
              </div>
              <div className="c-t-status">
                <div className="l-margin-small">
                  <h3>Status</h3>
                </div>
              </div>
            </div>

            {allTasksByProg &&
              allTasksByProgArr &&
              allTasksByProgArr.map((task) => {
                return (
                  <div className="">
                    <div className="row hi">
                      <div className="c-t-name">
                        <div className="l-margin-small">
                          <div
                            className="solid-round-sq jc-c ai-c  font-small-med pad-04"
                            style={{ backgroundColor: arrayOfColors[task.id] }}
                          >
                            <i className="fa-regular fa-circle-check lr-margin-small"></i>
                          </div>
                          <div className="lr-margin-small"> {task.name} </div>
                        </div>
                      </div>

                      <div className="c-t-description">
                        <div className="l-margin-small">{task.description}</div>
                      </div>

                      <div className="c-t-status">
                        <div className="l-margin-small">
                          {(task.stageId == 1 || task.stageId == 2) && "Due"}
                          {task.stageId == 3 && "Completed"}{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC",
                          }).format(new Date(task.dueDate))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default TryTS;

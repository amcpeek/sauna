import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchOneProject } from "../../store/project";
import { getAllTasksByProjectId } from "../../store/task";
import { authenticate } from "../../store/session";
import ViewTask from "../Tasks/ViewTask";
import CreateTask from "../Tasks/CreateTask";
import EditTask from "../Tasks/EditTask";
import EditProjectModal from "./EditProjectModal";
import { fetchAllTeams, fetchOneTeam } from "../../store/team";
import { fetchCreateMembership } from "../../store/membership";
import arrayOfColors from "../../assets/ArrayOfColors";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import StageColumn from "./NewStageColumn";
import { fetchUpdateTask } from "../../store/task";
import TryTS from "./TryTS";

const NewViewProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedTask, setSelectedTask] = useState(1);
  const [showTask, setShowTask] = useState(false);
  const [showAddTask1, setShowAddTask1] = useState(false);
  const [showAddTask2, setShowAddTask2] = useState(false);
  const [showAddTask3, setShowAddTask3] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [overView, setOverView] = useState(false);
  const [boardView, setBoardView] = useState(true);
  const [listView, setListView] = useState(false);
  const [users, setUsers] = useState([]);
  let arr = [];
  let isMember = "";
  let memberArray = [];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  const findProjectTest = async () => {
    const returnProject = await dispatch(fetchOneProject(id));
    const returnTasks = await dispatch(getAllTasksByProjectId(id));
    const returnUser = await dispatch(authenticate());
    const returnTeam = await dispatch(fetchAllTeams());
  };
  const showTaskFunc = (task) => {
    setSelectedTask(task);
    showTask ? setShowTask(false) : setShowTask(true);
  };
  let oneProject = useSelector((state) => {
    return state.project[id];
  });
  let allTasksByProg = useSelector((state) => {
    return state.task.tasksByProjectId;
  });
  let user = useSelector((state) => {
    return state.session.user;
  });
  let oneTeam = useSelector((state) => {
    let projId = state.project[id];
    let tId = 0;

    if (projId) {
      tId = state.team[projId.teamId];
    }
    return tId;
  });

  useEffect(() => {
    findProjectTest();
  }, [dispatch]);

  if (allTasksByProg && allTasksByProg[id]) {
    arr = Object.values(allTasksByProg[id]);
  }

  if (oneTeam && oneTeam.memberships && user) {
    memberArray = oneTeam.memberships;
    isMember = memberArray.find((member) => member.users[0].id == user.id);
    if (isMember) {
    }
  }

  const handleCreateMembership = async (teamId) => {
    await dispatch(fetchCreateMembership(teamId))
      .then(dispatch(fetchAllTeams()))
      .catch(async (err) => {});
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (arr) {
      let curTask = arr.find((task) => task.id == draggableId);
      curTask.stageId = parseInt(destination.droppableId);
      const response = await dispatch(fetchUpdateTask(curTask));
      if (response.errors) {
        //    setValidationErrors(Object.values(response.errors))
        console.log(Object.values(response.errors));
      } else {
        if (showTask) {
          setShowTask(false);
        }
      }
    }
  };

  if (oneProject && oneTeam) {
    console.log("oneProject Shape", oneProject);
    const toDo = arr.filter((task) => task.stageId == 1);
    const inProg = arr.filter((task) => task.stageId == 2);
    const complete = arr.filter((task) => task.stageId == 3);
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="col">
          <div className="col vh-5 lr-margin-small">
            <div className="should-wrap-full row ai-c">
              <div
                className="solid-round-sq jc-c ai-c"
                style={{ backgroundColor: arrayOfColors[oneProject.id] }}
              >
                <i className="fa-solid fa-list-ul"></i>
              </div>
              &nbsp;&nbsp;
              <h2>{oneProject.name}</h2>
            </div>
          </div>
          <div className="f vh-5 lr-margin-small ai-c ">
            <div className="row jc-sa lr-margin-small">
              {user && user.id == oneProject.ownerId && (
                <div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="just-text-button bg-white"
                  >
                    <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
                  </button>
                  <EditProjectModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
              )}
              <div>
                <button
                  onClick={() => (
                    setListView(false), setBoardView(false), setOverView(true)
                  )}
                  className="just-text-button  bg-white cursor"
                >
                  Overview
                </button>
                {overView && <div className="gray-line-med"></div>}
              </div>
              <div>
                <button
                  onClick={() => (
                    setListView(false), setOverView(false), setBoardView(true)
                  )}
                  className="just-text-button bg-white cursor"
                >
                  Board
                </button>
                {boardView && <div className="gray-line-med"></div>}
              </div>
              <div>
                <button
                  onClick={() => (
                    setBoardView(false), setOverView(false), setListView(true)
                  )}
                  className="just-text-button  bg-white cursor"
                >
                  List
                </button>
                {listView && <div className="gray-line-med"></div>}
              </div>
              <div>
                <button
                  onClick={() => history.push(`/projects/${id}/customer`)}
                  className="just-text-button  bg-white cursor"
                >
                  Customer View
                </button>
                {listView && <div className="gray-line-med"></div>}
              </div>
            </div>
            {user &&
            !oneTeam.memberships.find(
              (member) => member.users[0].id == user.id
            ) ? (
              <div className="row ai-c">
                <button
                  className="asana-button height-shorter"
                  onClick={() => handleCreateMembership(oneTeam.id)}
                >
                  Join Team
                </button>
                <p className="font-small-med">
                  {" "}
                  &nbsp; * &nbsp;Only team member can engage with tasks &nbsp;
                  &nbsp;{" "}
                </p>
              </div>
            ) : (
              <div>
                {" "}
                <div className="just-text-button  bg-white text-blue">
                  Try Dragging and Dropping Tasks!
                </div>{" "}
                <div className="gray-line-med-none"></div>
              </div>
            )}
          </div>
          <div className="jc-c">
            <div className="bg-light-gray round-sq-05 vw-99-vh-70 scroller-tasks box-shadow-darker">
              {/* ONLY SHOWS IF OVERVIEW IS TRUE */}
              {overView && (
                <div className="jc-c width-100-per">
                  <div className="col lr-margin-med">
                    <h2 className="should-wrap-70"></h2>

                    <div className="col">
                      <div className="tb-margin">Our Purpose</div>
                      <div className="long-gray-line"></div>
                      <div className="should-wrap-100-per tb-margin">
                        {oneProject.description}
                      </div>
                      {user && user.id == oneProject.owner.id && (
                        <div className=" vh-5 ai-c jc-st">
                          <button
                            onClick={() => setShowModal(true)}
                            className="no-bor bg-white row"
                          >
                            <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
                          </button>
                          <EditProjectModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div> </div>
                      <div className="tb-margin">Project Lead</div>
                      <div className="long-gray-line"></div>
                      <div className="row ai-c width-members tb-margin">
                        <div
                          className="solid-circle jc-c ai-c font-small-med pad-04"
                          style={{
                            backgroundColor: arrayOfColors[oneProject.owner.id],
                          }}
                        >
                          {oneProject.owner.username.slice(0, 2)}
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;{oneProject.owner.username}</div>
                      </div>
                    </div>

                    <div className="col t-margin jc-c">
                      <div>{oneTeam.name}</div>
                      <div className="tb-margin">
                        Team Members ({oneTeam.memberships.length})
                      </div>
                      <div className="long-gray-line"></div>
                      <div className="row flex-wrap">
                        {user &&
                          !oneTeam.memberships.find(
                            (member) => member.users[0].id == user.id
                          ) && (
                            <div className="row ai-c width-members tb-margin  ">
                              <button
                                className="no-bor match-tasks jc-st ai-c cursor pad-0"
                                onClick={() =>
                                  handleCreateMembership(oneTeam.id)
                                }
                              >
                                <div className="dotted-circle jc-c ai-c font-small-med pad-04">
                                  <i className="fa-solid fa-plus"></i>
                                </div>

                                <div className="font-med">&nbsp; Join Team</div>
                              </button>
                            </div>
                          )}
                        <div className="ai-c jc-c">
                          {oneTeam.memberships &&
                            !oneTeam.memberships.length && (
                              <div>This team does not yet have any members</div>
                            )}
                        </div>

                        {oneTeam.memberships &&
                          oneTeam.memberships.map((member) => {
                            return (
                              <div>
                                <div> </div>
                                <div className="row ai-c width-members tb-margin">
                                  <div
                                    className="solid-circle jc-c ai-c font-small-med pad-04"
                                    style={{
                                      backgroundColor:
                                        arrayOfColors[member.users[0].id],
                                    }}
                                  >
                                    {member.users[0].username.slice(0, 2)}
                                  </div>
                                  <div>
                                    &nbsp;&nbsp;&nbsp;{member.users[0].username}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ONLY SHOWS IF LIST IS TRUE */}
              {/* {listView && !users && (
                            <div className='lr-margin tb-margin'>List view is only accessible once logged in</div>
                    )} */}

              {listView && (
                <div className="f width-100-per jc-c">
                  <div className="col lr-margin-med">
                    <div className="row jc-st margin-t-2">
                      <div className="all-teams-name">
                        <div className="l-margin-small">
                          <h2>Task</h2>
                        </div>
                      </div>
                      <div className="all-teams-owner">
                        <div className="l-margin-small">
                          <h2>Assignee</h2>
                        </div>
                      </div>
                      <div className="all-teams-members-task">
                        <div className="l-margin-small">
                          <h2>Due Date</h2>
                        </div>
                      </div>
                    </div>
                    <div className="l-margin-small">
                      <h3>To Do</h3>
                    </div>
                    {toDo && !toDo.length && (
                      <div className="l-margin-small text-blue">
                        No "to do" tasks
                      </div>
                    )}
                    {toDo.map((task) => {
                      return (
                        <div className="">
                          <div className="row">
                            <div className="row all-teams-name ai-c ">
                              <div
                                className="solid-round-sq jc-c ai-c tb-margin lr-margin-small  font-small-med pad-04"
                                style={{
                                  backgroundColor: arrayOfColors[task.id],
                                }}
                              >
                                <i className="fa-regular fa-circle-check lr-margin-small"></i>
                              </div>
                              <div className="tb-margin"> {task.name} </div>
                            </div>
                            <div className="row all-teams-owner ai-c">
                              {users ? (
                                <>
                                  <div
                                    className="solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small"
                                    style={{
                                      backgroundColor:
                                        arrayOfColors[
                                          users.find(
                                            (user) =>
                                              user.id === task.assigneeId
                                          ).id
                                        ],
                                    }}
                                  >
                                    {users
                                      .find(
                                        (user) => user.id === task.assigneeId
                                      )
                                      .username.slice(0, 2)}
                                  </div>
                                  <div className="ai-c">
                                    {" "}
                                    {users && (
                                      <div>
                                        {" "}
                                        {
                                          users.find(
                                            (user) =>
                                              user.id === task.assigneeId
                                          ).username
                                        }
                                      </div>
                                    )}{" "}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small"></div>
                                  <div className="ai-c"></div>
                                </>
                              )}
                            </div>
                            <div className="ai-c">
                              <div className="row all-teams-members-task ai-c">
                                <div className="l-margin-small">
                                  {new Intl.DateTimeFormat("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "UTC",
                                  }).format(new Date(task.dueDate))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="l-margin-small">
                      <h3>In Progress</h3>
                    </div>
                    {inProg && !inProg.length && (
                      <div className="l-margin-small text-blue">
                        No "in progress" tasks
                      </div>
                    )}
                    {inProg.map((task) => {
                      return (
                        <div className="">
                          <div className="row">
                            <div className="row all-teams-name ai-c ">
                              <div
                                className="solid-round-sq jc-c ai-c tb-margin lr-margin-small  font-small-med pad-04"
                                style={{
                                  backgroundColor: arrayOfColors[task.id],
                                }}
                              >
                                <i className="fa-regular fa-circle-check lr-margin-small"></i>
                              </div>
                              <div className="tb-margin"> {task.name} </div>
                            </div>
                            <div className="row all-teams-owner ai-c">
                              {users ? (
                                <>
                                  <div
                                    className="solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small"
                                    style={{
                                      backgroundColor:
                                        arrayOfColors[
                                          users.find(
                                            (user) =>
                                              user.id === task.assigneeId
                                          ).id
                                        ],
                                    }}
                                  >
                                    {users
                                      .find(
                                        (user) => user.id === task.assigneeId
                                      )
                                      .username.slice(0, 2)}
                                  </div>
                                  <div className="ai-c">
                                    {" "}
                                    {users && (
                                      <div>
                                        {" "}
                                        {
                                          users.find(
                                            (user) =>
                                              user.id === task.assigneeId
                                          ).username
                                        }
                                      </div>
                                    )}{" "}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small"></div>
                                  <div className="ai-c"></div>
                                </>
                              )}
                            </div>
                            <div className="ai-c">
                              <div className="row all-teams-members-task ai-c">
                                <div className="l-margin-small">
                                  {new Intl.DateTimeFormat("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "UTC",
                                  }).format(new Date(task.dueDate))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="l-margin-small">
                      <h3>Complete</h3>
                    </div>
                    {complete && !complete.length && (
                      <div className="l-margin-small text-blue">
                        No "complete" tasks
                      </div>
                    )}

                    {complete.map((task) => {
                      return (
                        <div className="">
                          <div className="row">
                            <div className="row all-teams-name ai-c ">
                              <div
                                className="solid-round-sq jc-c ai-c tb-margin lr-margin-small  font-small-med pad-04"
                                style={{
                                  backgroundColor: arrayOfColors[task.id],
                                }}
                              >
                                <i className="fa-regular fa-circle-check lr-margin-small"></i>
                              </div>
                              <div className="tb-margin"> {task.name} </div>
                            </div>
                            <div className="row all-teams-owner ai-c">
                              {users ? (
                                <>
                                  <div
                                    className="solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small"
                                    style={{
                                      backgroundColor:
                                        arrayOfColors[
                                          users.find(
                                            (user) =>
                                              user.id === task.assigneeId
                                          ).id
                                        ],
                                    }}
                                  >
                                    {users
                                      .find(
                                        (user) => user.id === task.assigneeId
                                      )
                                      .username.slice(0, 2)}
                                  </div>
                                  <div className="ai-c">
                                    {" "}
                                    {users && (
                                      <div>
                                        {" "}
                                        {
                                          users.find(
                                            (user) =>
                                              user.id === task.assigneeId
                                          ).username
                                        }
                                      </div>
                                    )}{" "}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small"></div>
                                  <div className="ai-c"></div>
                                </>
                              )}
                            </div>
                            <div className="ai-c">
                              <div className="row all-teams-members-task ai-c">
                                <div className="l-margin-small">
                                  {new Intl.DateTimeFormat("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "UTC",
                                  }).format(new Date(task.dueDate))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="l-margin-small">
                      *Use Board View to edit
                    </div>
                  </div>
                </div>
              )}

              {/* ONLY SHOWS IF BOARD IS TRUE */}

              {boardView && (
                <div className="f width-100-per">
                  <div className="progColView">
                    <Droppable droppableId={"1"} key={`${1}${"To Do"}`}>
                      {(provided, snapshot) => (
                        <div key={1} className="columnView">
                          <h2 className="col-title">
                            To Do{" "}
                            {isMember && (
                              <button
                                className="just-text-button match-tasks"
                                onClick={() =>
                                  showAddTask1
                                    ? setShowAddTask1(false)
                                    : setShowAddTask1(true)
                                }
                              >
                                <i className="fa-solid fa-plus"></i>
                              </button>
                            )}{" "}
                          </h2>
                          <StageColumn
                            column={toDo}
                            // setHasSubmitted={setHasSubmitted}
                            placeholder={provided.placeholder}
                            provided={provided}
                            isDraggingOver={snapshot.isDraggingOver}
                            // loaded={loaded}
                            selectedTask={selectedTask}
                            showTask={showTask}
                            setSelectedTask={setSelectedTask}
                            setShowTask={setShowTask}
                          ></StageColumn>
                        </div>
                      )}
                    </Droppable>
                    <>
                      {showAddTask1 && (
                        <button className="createTaskView">
                          <CreateTask
                            setShowAddTask1={setShowAddTask1}
                            showAddTask1={showAddTask1}
                          />
                        </button>
                      )}
                    </>
                  </div>

                  <div className="progColView">
                    <Droppable droppableId={"2"} key={`${2}${"In Progress"}`}>
                      {(provided, snapshot) => (
                        <div key={2} className="columnView">
                          <h2 className="col-title">
                            In Progress{" "}
                            {isMember && (
                              <button
                                className="just-text-button match-tasks"
                                onClick={() =>
                                  showAddTask2
                                    ? setShowAddTask2(false)
                                    : setShowAddTask2(true)
                                }
                              >
                                <i className="fa-solid fa-plus"></i>
                              </button>
                            )}{" "}
                          </h2>
                          <StageColumn
                            column={inProg}
                            // setHasSubmitted={setHasSubmitted}
                            placeholder={provided.placeholder}
                            provided={provided}
                            isDraggingOver={snapshot.isDraggingOver}
                            // loaded={loaded}
                            selectedTask={selectedTask}
                            showTask={showTask}
                            setSelectedTask={setSelectedTask}
                            setShowTask={setShowTask}
                          ></StageColumn>
                        </div>
                      )}
                    </Droppable>
                    <>
                      {showAddTask2 && (
                        <button className="createTaskView">
                          <CreateTask
                            setShowAddTask2={setShowAddTask2}
                            showAddTask2={showAddTask2}
                          />
                        </button>
                      )}
                    </>
                  </div>
                  <div className="progColView">
                    <Droppable droppableId={"3"} key={`${3}${"Complete"}`}>
                      {(provided, snapshot) => (
                        <div key={3} className="columnView">
                          <h2 className="col-title">
                            Complete{" "}
                            {isMember && (
                              <button
                                className="just-text-button match-tasks"
                                onClick={() =>
                                  showAddTask3
                                    ? setShowAddTask3(false)
                                    : setShowAddTask3(true)
                                }
                              >
                                <i className="fa-solid fa-plus"></i>
                              </button>
                            )}{" "}
                          </h2>
                          <StageColumn
                            column={complete}
                            // setHasSubmitted={setHasSubmitted}
                            placeholder={provided.placeholder}
                            provided={provided}
                            isDraggingOver={snapshot.isDraggingOver}
                            // loaded={loaded}
                            selectedTask={selectedTask}
                            showTask={showTask}
                            setSelectedTask={setSelectedTask}
                            setShowTask={setShowTask}
                          ></StageColumn>
                        </div>
                      )}
                    </Droppable>
                    <>
                      {showAddTask3 && (
                        <button className="createTaskView">
                          <CreateTask
                            setShowAddTask3={setShowAddTask3}
                            showAddTask3={showAddTask3}
                          />
                        </button>
                      )}
                    </>
                  </div>
                  {/* shared show task popup */}

                  {showTask && selectedTask && (
                    <div className="editTaskView">
                      <div
                        className="jc-end just-text-button b-margin bg-white round-sq-05 height-task width-90-per"
                        style={
                          !showTask ? { transform: "translateX(+105%)" } : {}
                        }
                      >
                        <button className=" width-100-per col just-text-button b-margin bg-white round-sq-05 height-task ai-c">
                          <ViewTask selectedTask={selectedTask} />
                          <EditTask
                            selectedTask={selectedTask}
                            showTask={showTask}
                            setShowTask={setShowTask}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  } else {
    return <div className="jc-c ai-c">This project does not exist</div>;
  }
};

export default NewViewProject;

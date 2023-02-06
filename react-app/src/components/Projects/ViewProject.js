import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchOneProject } from '../../store/project'
import { getAllTasksByProjectId } from '../../store/task'
import { authenticate } from '../../store/session';
import ViewTask from '../Tasks/ViewTask';
import CreateTask from '../Tasks/CreateTask';
import EditTask from '../Tasks/EditTask';
import EditProjectModal from './EditProjectModal';
import { fetchAllTeams, fetchOneTeam } from '../../store/team'
import { fetchCreateMembership } from '../../store/membership'
import arrayOfColors from '../../assets/ArrayOfColors';


const ViewProject = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [selectedTask, setSelectedTask] = useState(1)
    const [showTask, setShowTask] = useState(false)
    const [showAddTask1, setShowAddTask1] = useState(false)
    const [showAddTask2, setShowAddTask2] = useState(false)
    const [showAddTask3, setShowAddTask3] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [overView, setOverView] = useState(false)
    const [boardView, setBoardView] = useState(true)
    const [listView, setListView] = useState(false)
    const [users, setUsers] = useState([]);
    let arr = []
    let isMember = ''
    let memberArray = []


    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, [dispatch]);


    //   if (users) {
    //     console.log('users', users)
    //   }

    //console.log('showAddTask1 in ViewProject', showAddTask1, setShowAddTask1)


    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(id))
        const returnTasks = await dispatch(getAllTasksByProjectId(id))
        const returnUser = await dispatch(authenticate())
        const returnTeam = await dispatch(fetchAllTeams())
    }



    //edit
    const showTaskFunc = (task) => {
        console.log('is task being passed int', task)
        setSelectedTask(task)
        showTask? setShowTask(false): setShowTask(true)


    }

    let oneProject = useSelector(state => {return state.project[id]})
    let allTasksByProg = useSelector(state => { return state.task.tasksByProjectId})
    let user = useSelector(state => {return state.session.user})
    let oneTeam = useSelector(state => {
        let projId = state.project[id]
        let tId = 0

        if(projId) {

            tId = state.team[projId.teamId]
           // console.log('8898789878987', projId.teamId, 'teamId', tId)
        }
        return tId
        } )


    useEffect(() => {
        findProjectTest()
     }, [dispatch ])


    if(allTasksByProg && allTasksByProg[id]) {
        arr = Object.values(allTasksByProg[id])
    }

    if(oneTeam && oneTeam.memberships && user) {
        // console.log('ONE   TEAM',oneTeam.memberships)

        // {memberArray && memberArray.length && memberArray.map(member => {return (
        //     <option value={member.id}>{member.users[0].username}</option>
        // )})}
        memberArray = oneTeam.memberships
        isMember = memberArray.find(member =>  member.users[0].id == user.id)
        if(isMember) {
          // console.log('isMember', isMember.id)
        }

    }

    const handleCreateMembership = async (teamId) => {
        await dispatch(fetchCreateMembership(teamId))
        .then(dispatch(fetchAllTeams()))
        //   .then(history.push(`/profile`)) //this isn't working at all
          .catch(async (err) => {
           // console.log('5555555555', err)
          })
     }

     console.log('one proj', oneProject, 'oneTeam', oneTeam)



    if(oneProject && oneTeam) {

        //console.log('allTasksByProg', Object.values(allTasksByProg[id]))
        const toDo = arr.filter(task => task.stageId == 1)
        const inProg = arr.filter(task => task.stageId == 2)
        const complete = arr.filter(task => task.stageId == 3)
        return (
            <div className='col'>
                <div className='col vh-5 lr-margin-small'>
                    {/* <div><Link to={'/'}><i className="fa-solid fa-house-chimney"></i></Link></div>
                    <div className='bg-green small-box round-sq'> AM</div> */}

                    <div className='should-wrap-full row ai-c'>
                    <div className='solid-round-sq jc-c ai-c' style={{backgroundColor: arrayOfColors[oneProject.id]}}><i className="fa-solid fa-list-ul"></i></div>&nbsp;&nbsp;
                        <h2>{oneProject.name}</h2>
                        </div>

                    {/* <div><Link to={`/projects/${id}/edit`}>Edit Project</Link></div> */}






                </div>
                <div className='f vh-5 lr-margin-small ai-c '>

                    <div className='row jc-sa lr-margin-small'>
                    {user &&  user.id == oneProject.ownerId &&
                     <div>
                     <button onClick={() => setShowModal(true)} className='just-text-button bg-white'>
                     <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
                     </button>
                     <EditProjectModal showModal={showModal} setShowModal={setShowModal}/>
                     </div>
                    }
                    <div>
                    <button onClick={() => (setListView(false),setBoardView(false), setOverView(true))} className='just-text-button  bg-white'>Overview</button>
                    {overView && <div className='gray-line-med'></div> }
                    </div>

                    <div>
                    <button onClick={() => (setListView(false), setOverView(false), setBoardView(true))}  className='just-text-button bg-white'>Board</button>
                    {boardView && <div className='gray-line-med'></div> }
                    </div>

                    <div>
                    <button onClick={() => (setBoardView(false), setOverView(false), setListView(true))}  className='just-text-button  bg-white'>List</button>
                    {listView && <div className='gray-line-med'></div> }
                    </div>

                    </div>






                    {user &&
                                    (!(oneTeam.memberships.find(member => member.users[0].id == user.id)) && (
                        <div className='row ai-c'>

                        <button className='asana-button height-shorter' onClick={() => handleCreateMembership(oneTeam.id)}>Join Team</button>
                        <p className='font-small-med'> &nbsp; *Only team member can engage with tasks &nbsp; &nbsp; </p>
                        </div>
                        // <div>{isMember.id}</div>
                    ))}
                </div>

                <div className='bg-light-gray round-sq-05 vw-99-vh-70 scroller-tasks'>

                    {/* ONLY SHOWS IF OVERVIEW IS TRUE */}


                    {overView && (
                        //  <div className='f width-100-per lr-margin-small'>
                        //      <div className='should-wrap-full scroller'>
                        //     <p className='font-small-med'>Project Lead: {oneProject.owner.username}<br/>
                        //     <p>Team: {oneTeam.name}</p>
                        //         {oneProject.description} </p>
                        //         </div>
                        //     <div className='long-gray-line tb-margin'></div>
                        //  </div>
                        <div className='jc-c width-100-per'>
                        <div className="col lr-margin-med">
                        <h2 className='should-wrap-70'></h2>

                        <div className="col">
                            <div className='tb-margin'>Our Purpose</div>
                            <div className='long-gray-line'></div>
                            <div className='should-wrap-100-per tb-margin'>
                            {oneProject.description}
                            </div>
                            {user && user.id == oneProject.owner.id && (
                                    <div className=' vh-5 ai-c jc-st'>
                                    <button onClick={() => (setShowModal(true)) } className='no-bor bg-white row'>
                                    <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
                                    </button>
                                    <EditProjectModal showModal={showModal} setShowModal={setShowModal}/>
                                    </div>

                                )}

                        </div>

                        <div>
                                        <div> </div>
                                        <div className='tb-margin'>Project Lead</div>
                            <div className='long-gray-line'></div>
                                        <div className='row ai-c width-members tb-margin'>
                                    <div className='solid-circle jc-c ai-c font-small-med pad-04'
                                    style={{backgroundColor: arrayOfColors[oneProject.owner.id]}}>{oneProject.owner.username.slice(0,2)}</div>
                                    <div>&nbsp;&nbsp;&nbsp;{oneProject.owner.username}</div>
                                </div>
                                    </div>



                        <div className='col t-margin jc-c'>
                            <div>{oneTeam.name}</div>
                            <div className='tb-margin'>Team Members ({oneTeam.memberships.length})</div>
                            <div className='long-gray-line'></div>
                            <div className='row flex-wrap'>

                                    {user &&
                                    (!(oneTeam.memberships.find(member => member.users[0].id == user.id)) && (
                                        <div className='row ai-c width-members tb-margin  '>
                                            <button className='no-bor match-tasks jc-st ai-c cursor pad-0' onClick={() => handleCreateMembership(oneTeam.id)}>
                                            <div className='dotted-circle jc-c ai-c font-small-med pad-04'>
                                            <i className="fa-solid fa-plus"></i>
                                            </div>

                                            <div className='font-med'>&nbsp; Join Team</div>
                                            </button>
                                        </div>
                                    ))}

                                    <div className='ai-c jc-c'>
                                    {oneTeam.memberships && !oneTeam.memberships.length && (<div  >This team does not yet have any members</div>)}
                                    </div>


                                    {oneTeam.memberships && oneTeam.memberships.map(member => {
                                        return (
                                            <div>
                                        <div> </div>
                                        <div className='row ai-c width-members tb-margin'>
                                    <div className='solid-circle jc-c ai-c font-small-med pad-04'
                                    style={{backgroundColor: arrayOfColors[member.users[0].id]}}>{member.users[0].username.slice(0,2)}</div>
                                    <div>&nbsp;&nbsp;&nbsp;{member.users[0].username}</div>
                                </div>
                                    </div>
                                        )
                                    })}
                            </div>
                            </div>
                            </div>
                            </div>




                    )}



                    {/* ONLY SHOWS IF LIST IS TRUE */}
                    {listView && !users && (
                            <div className='lr-margin tb-margin'>List view is only accessible once logged in</div>
                    )}

                    {listView && users && (
                         <div className='f width-100-per jc-c'>
                           {/* <h2 className='lr-margin jc-c'>This feature is still in development</h2> */}






                        <div className="col lr-margin-med">
                        {/* <h1 className='tb-margin lr-margin-x-small'>All Teams</h1> */}

                        <div className='row jc-st'>
                            <div className='all-teams-name '>
                                <div className='l-margin-small'>Task</div>
                                </div>
                            <div className='all-teams-owner'>
                            <div className='l-margin-small'>Assignee</div>
                                </div>
                            <div className='all-teams-members-task'>
                            <div className='l-margin-small'>Due Date</div>
                                </div>
                        </div>
                        {/* <div className='long-gray-line'></div> */}


                         <div className='l-margin-small'>To Do</div>
                         {toDo && !toDo.length && (<div className='l-margin-small text-blue'>No "to do" tasks</div>)}


                         {toDo.map(task => {
                                  return (
                                    <div className=''>
                                    <div className='row'>
                                        <div className='row all-teams-name ai-c '>
                                            <div className='solid-round-sq jc-c ai-c tb-margin lr-margin-small' style={{backgroundColor: arrayOfColors[task.id]}}><i className="fa-regular fa-circle-check lr-margin-small"></i></div>
                                            <div className='tb-margin'> {task.name} </div>
                                        </div>
                                        <div className='row all-teams-owner'>
                                             <div className='solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small' style={{backgroundColor: arrayOfColors[(users.find(user => user.id === task.assigneeId)).id]}}>{((users.find(user => user.id === task.assigneeId)).username).slice(0,2)}</div>
                                             <div className='ai-c'> {users && (<div> {(users.find(user => user.id === task.assigneeId)).username }</div>)} </div>
                                        </div>
                                        <div className='ai-c'>
                                            <div className='row all-teams-members-task ai-c'>
                                                <div className='l-margin-small'>Feb {task.id}</div>
                                                </div>
                                        </div>
                                    </div>
                                        </div>)})}
                        <div className='l-margin-small'>In Progress</div>
                        {inProg && !inProg.length && (<div className='l-margin-small text-blue'>No "in progress" tasks</div>)}
                            {inProg.map(task => {
                        return (
                        <div className=''>
                        <div className='row'>
                            <div className='row all-teams-name ai-c '>
                                <div className='solid-round-sq jc-c ai-c tb-margin lr-margin-small' style={{backgroundColor: arrayOfColors[task.id]}}><i className="fa-regular fa-circle-check lr-margin-small"></i></div>
                                <div className='tb-margin'> {task.name} </div>
                            </div>
                            <div className='row all-teams-owner'>
                                             <div className='solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small' style={{backgroundColor: arrayOfColors[(users.find(user => user.id === task.assigneeId)).id]}}>{((users.find(user => user.id === task.assigneeId)).username).slice(0,2)}</div>
                                             <div className='ai-c'> {users && (<div> {(users.find(user => user.id === task.assigneeId)).username }</div>)} </div>
                            </div>
                            <div className='ai-c'>
                                <div className='row all-teams-members-task ai-c'>
                                    <div className='l-margin-small'>Feb {task.id}</div>
                                    </div>
                            </div>
                        </div>
                            </div>)})}
                            <div className='l-margin-small'>Complete</div>
                            {complete && !complete.length && (<div className='l-margin-small text-blue'>No "complete" tasks</div>)}

                            {complete.map(task => {
                                  return (
                                    <div className=''>
                                    <div className='row'>
                                        <div className='row all-teams-name ai-c '>
                                            <div className='solid-round-sq jc-c ai-c tb-margin lr-margin-small' style={{backgroundColor: arrayOfColors[task.id]}}><i className="fa-regular fa-circle-check lr-margin-small"></i></div>
                                            <div className='tb-margin'> {task.name} </div>
                                        </div>
                                        <div className='row all-teams-owner'>
                                             <div className='solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small' style={{backgroundColor: arrayOfColors[(users.find(user => user.id === task.assigneeId)).id]}}>{((users.find(user => user.id === task.assigneeId)).username).slice(0,2)}</div>
                                             <div className='ai-c'> {users && (<div> {(users.find(user => user.id === task.assigneeId)).username }</div>)} </div>
                                        </div>
                                        <div className='ai-c'>
                                            <div className='row all-teams-members-task ai-c'>
                                                <div className='l-margin-small'>Feb {task.id}</div>
                                                </div>
                                        </div>
                                    </div>
                                        </div>)})}
                                        <div className='l-margin-small'>*Use Board View to edit</div>

                    </div>
                    </div>
                    )}


                    {/* ONLY SHOWS IF BOARD IS TRUE */}

                    {boardView && (
                         <div className='f width-100-per'>
                         <div className='col width-40-per lr-margin-small'>
                             <h2>To Do
                                 {isMember && (
                                  <button className='match-tasks cursor' onClick={() => (showAddTask1? setShowAddTask1(false): setShowAddTask1(true))}><i className="fa-solid fa-plus "></i></button>
                                 )}

                                 </h2>
                             {toDo.map(task=> {
                                 return (
                                     <button className="f just-text-button b-margin bg-white round-sq-05 height-task cursor pad--1" key={task.id} onClick={() => (showTaskFunc(task))}>
                                         <i className="fa-regular fa-circle-check"></i>&nbsp;&nbsp;
                                         {task.name}
                                     </button>
                                 )
                             })}
                             <div  className="jc-end"
                             // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                             >
                                 {showAddTask1 &&
                                 <button className=" width-100-per bg-white just-text-button round-sq-05 box-shadow b-margin">
                             <CreateTask setShowAddTask1={setShowAddTask1} showAddTask1={showAddTask1}/>
                             {/* this prop thing isnt working yet, doesnt seem to be doing anything actually */}
                             </button>
                                 }

                             </div>

                         </div>



                         <div className='col width-40-per lr-margin-small'>
                             <h2>In Progress
                             {isMember && (<button className='just-text-button match-tasks' onClick={() => ( showAddTask2? setShowAddTask2(false): setShowAddTask2(true))}><i className="fa-solid fa-plus"></i></button>
                             )}

                                 </h2>
                             {inProg.map(task=> {
                                 return (
                                     <button className="f just-text-button b-margin bg-white round-sq-05 height-task cursor pad--1" key={task.id} onClick={() => (showTaskFunc(task)) }>
                                         <i className="fa-regular fa-circle-check"></i>&nbsp;&nbsp;
                                         {task.name}
                                     </button>
                                 )
                             })}
                             <div  className="jc-end"
                             // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                             >
                                 {showAddTask2 &&
                                 <button className=" width-100-per bg-white just-text-button round-sq-05 box-shadow b-margin">
                             <CreateTask setShowAddTask2={setShowAddTask2} showAddTask2={showAddTask2}/>
                             </button>
                                 }

                             </div>
                         </div>
                         <div className='col width-40-per lr-margin-small'>
                             <h2>Complete
                             {isMember && (
                                 <button className='just-text-button match-tasks' onClick={() => ( showAddTask3? setShowAddTask3(false): setShowAddTask3(true))}><i className="fa-solid fa-plus"></i></button>
                             )}

                                 </h2>
                             {complete.map(task=> {
                                 return (
                                     <button className="f just-text-button b-margin bg-white round-sq-05 height-task cursor pad--1" key={task.id} onClick={() =>  (showTaskFunc(task)) }>
                                         <i className="fa-regular fa-circle-check"></i>&nbsp;&nbsp;
                                         {task.name}
                                     </button>
                                 )
                             })}
                             <div  className="jc-end"
                             // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                             >
                                 {showAddTask3 &&
                                 <button className=" width-100-per bg-white just-text-button round-sq-05 box-shadow b-margin">
                             <CreateTask setShowAddTask3={setShowAddTask3} showAddTask3={showAddTask3}/>
                             </button>
                                 }

                             </div>

                         </div>
                         {showTask && selectedTask &&
                          <div className='f col width-40-per bg-white box-shadow round-sq-05  ai-c'>
                          <div  className="jc-end just-text-button b-margin bg-white round-sq-05 height-task width-90-per" style={!showTask ? { transform: 'translateX(+105%)' } : {}}>
                              <button className=" width-100-per col just-text-button b-margin bg-white round-sq-05 height-task " >
                              {/* onClick={() => setShowTask(false)}  add back in later*/}
                              <ViewTask selectedTask={selectedTask}/>
                              <EditTask selectedTask={selectedTask} showTask={showTask} setShowTask={setShowTask}/>
                              {/* {console.log('Edit task in main page', selectedTask, showTask, setShowTask )} */}
                              </button>
                          </div>

                      </div>
                         }

                         </div>


                    )}
                       </div>



        </div>

        )
    } else {
        return (
            <div className='jc-c ai-c'>This project does not exist</div>
        )
    }
}

export default ViewProject

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
    let arr = []
    let isMember = ''
    let memberArray = []



    //console.log('showAddTask1 in ViewProject', showAddTask1, setShowAddTask1)


    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(id))
        const returnTasks = await dispatch(getAllTasksByProjectId(id))
        const returnUser = await dispatch(authenticate())
        const returnTeam = await dispatch(fetchAllTeams())
    }



    //edit
    const showTaskFunc = (task) => {
        showTask? setShowTask(false): setShowTask(true)
        setSelectedTask(task)

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
     }, [dispatch])


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
                    {user &&  user.id == oneProject.ownerId &&
                     <div>
                     <button onClick={() => setShowModal(true)} className='just-text-button bg-white'>
                     <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
                     </button>
                     <EditProjectModal showModal={showModal} setShowModal={setShowModal}/>
                     </div>
                    }

                    <button onClick={() => (setListView(false),setBoardView(false), setOverView(true))} className='just-text-button  bg-white'>Overview</button>
                    <button onClick={() => (setListView(false), setOverView(false), setBoardView(true))}  className='just-text-button bg-white'>Board</button>
                    <button onClick={() => (setBoardView(false), setOverView(false), setListView(true))}  className='just-text-button  bg-white'>List</button>
                    {oneTeam && oneTeam.memberships && user && memberArray && !isMember && (
                        <div className='row ai-c'>

                        <button className='asana-button height-shorter' onClick={() => handleCreateMembership(oneProject.teamId)}>Join Team</button>
                        <p className='font-small-med'> &nbsp; *Only team member can engage with tasks &nbsp; &nbsp; </p>
                        </div>
                        // <div>{isMember.id}</div>
                    )}
                </div>



                <div className='bg-light-gray round-sq-05 vw-99-vh-70 scroller-tasks'>

                    {/* ONLY SHOWS IF OVERVIEW IS TRUE */}


                    {overView && (
                         <div className='f width-100-per lr-margin-small'>
                             <div className='should-wrap-full scroller'>
                            <p className='font-small-med'>Project Lead: {oneProject.owner.username}<br/>

                            <p>Team: {oneTeam.name}</p>
                                {oneProject.description} </p>
                                </div>
                            <div className='long-gray-line tb-margin'></div>

                         </div>

                    )}

                    {/* ONLY SHOWS IF LIST IS TRUE */}

                    {listView && (
                        <div className='f width-100-per jc-c'>
                            <h2 className='lr-margin jc-c'>This feature is still in development</h2>
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
                         {showTask &&
                          <div className='f col width-40-per bg-white box-shadow round-sq-05  ai-c'>
                          <div  className="jc-end just-text-button b-margin bg-white round-sq-05 height-task width-90-per" style={!showTask ? { transform: 'translateX(+105%)' } : {}}>
                              <button className=" width-100-per col just-text-button b-margin bg-white round-sq-05 height-task " >
                              {/* onClick={() => setShowTask(false)}  add back in later*/}
                              <ViewTask selectedTask={selectedTask}/>
                              <EditTask selectedTask={selectedTask} showTask={showTask} setShowTask={setShowTask}/>
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

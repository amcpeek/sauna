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
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import StageColumn from './NewStageColumn'
import { fetchUpdateTask } from '../../store/task';


const NewViewProject = () => {
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

    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(id))
        const returnTasks = await dispatch(getAllTasksByProjectId(id))
        const returnUser = await dispatch(authenticate())
        const returnTeam = await dispatch(fetchAllTeams())
    }
    const showTaskFunc = (task) => {
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
        memberArray = oneTeam.memberships
        isMember = memberArray.find(member =>  member.users[0].id == user.id)
        if(isMember) {
        }

    }

    const handleCreateMembership = async (teamId) => {
        await dispatch(fetchCreateMembership(teamId))
        .then(dispatch(fetchAllTeams()))
          .catch(async (err) => {
          })
     }

     const onDragEnd = async result => {
        const { destination, source, draggableId } = result
        if (!destination) {
            return
        }
        console.log('result', result)




        if(arr) {
           let curTask =  arr.find(task => task.id == draggableId)
           curTask.stageId = parseInt(destination.droppableId)
           const response = await dispatch(fetchUpdateTask(curTask))
           if(response.errors) {
            //    setValidationErrors(Object.values(response.errors))
               console.log(Object.values(response.errors))
           } else{
               if(showTask) {
                   setShowTask(false)
               }
           }



        }
    }

        //this will need to be changed ^^^^^^^^^^^@@@@@@@@@@@@@@@^^^^^^^^^^^^^
        // If card is dropped in different list column, send thunk to move it
        // if (destination.droppableId !== source.droppableId) {
        //     // UPDATE AND MATCH THE DROPPABLE ID FORMAT AND DRAGGABLE ID FORMAT
        //     // let sourceColumn = column.find(column => column.name === source.droppableId)
        //     // let destinationColumn = column.find(column => column.name === destination.droppableId)
        //     // let grabbedTask = sourceColumn?.task.find(task=> task.id.toString() === draggableId.toString())

        //     // let input = {
        //     //     name: grabbedTask.name,
        //     //     description: grabbedTask.description,
        //     //     stageId: destinationColumn.id,
        //     // }
        //     // setLoaded(false)
        //     // dispatch(editCardThunk(input, grabbedCard.id))
        //     // .then(() => setHasSubmitted(prevValue => !prevValue))
        // }




    if(oneProject && oneTeam) {
        const toDo = arr.filter(task => task.stageId == 1)
        const inProg = arr.filter(task => task.stageId == 2)
        const complete = arr.filter(task => task.stageId == 3)
        return (
            <DragDropContext onDragEnd={onDragEnd}>
            <div className='col'>
                <div className='col vh-5 lr-margin-small'>
                    <div className='should-wrap-full row ai-c'>
                    <div className='solid-round-sq jc-c ai-c' style={{backgroundColor: arrayOfColors[oneProject.id]}}><i className="fa-solid fa-list-ul"></i></div>&nbsp;&nbsp;
                        <h2>{oneProject.name}</h2>
                        </div>
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
                    ))}
                </div>
                <div className='bg-light-gray round-sq-05 vw-99-vh-70 scroller-tasks'>
                    {/* ONLY SHOWS IF OVERVIEW IS TRUE */}
                    {/* ONLY SHOWS IF LIST IS TRUE */}
                    {/* ONLY SHOWS IF BOARD IS TRUE */}

                    {boardView && (
                         <div className='f width-100-per'>
                            <div className='progColView'>
                             <Droppable droppableId={'1'} key={`${1}${'To Do'}`}>
                             {(provided, snapshot) => (
                                        <div key={1} >
                                             <h2>To Do  {isMember && (<button className='just-text-button match-tasks' onClick={() => ( showAddTask1? setShowAddTask1(false): setShowAddTask1(true))}><i className="fa-solid fa-plus"></i></button> )} </h2>
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
                                            >
                                            </StageColumn>
                                        </div>
                                    )}
                             </Droppable>
                             <div  className="jc-end">
                                 {showAddTask1 &&
                                 <button className="createTaskView">
                             <CreateTask setShowAddTask1={setShowAddTask1} showAddTask1={showAddTask1}/>
                             </button>
                                 }
                             </div>
                             </div>
                            {/* end of one block */}


                             <div className='progColView'>
                             <Droppable droppableId={'2'} key={`${2}${'In Progress'}`}>
                             {(provided, snapshot) => (
                                        <div key={2} >
                                             <h2>In Progress  {isMember && (<button className='just-text-button match-tasks' onClick={() => ( showAddTask2? setShowAddTask2(false): setShowAddTask2(true))}><i className="fa-solid fa-plus"></i></button> )} </h2>
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
                                            >
                                            </StageColumn>
                                        </div>
                                    )}
                             </Droppable>
                             <div  className="jc-end">
                                 {showAddTask2 &&
                                 <button className="createTaskView">
                             <CreateTask setShowAddTask2={setShowAddTask2} showAddTask2={showAddTask2}/>
                             </button>
                                 }
                             </div>
                             </div>
                             <div className='progColView'>
                             <Droppable droppableId={'3'} key={`${3}${'Complete'}`}>
                             {(provided, snapshot) => (
                                        <div key={3} >
                                             <h2>Complete  {isMember && (<button className='just-text-button match-tasks' onClick={() => ( showAddTask3? setShowAddTask3(false): setShowAddTask3(true))}><i className="fa-solid fa-plus"></i></button> )} </h2>
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
                                            >
                                            </StageColumn>
                                        </div>
                                    )}
                             </Droppable>
                             <div  className="jc-end">
                                 {showAddTask3 &&
                                 <button className="createTaskView">
                             <CreateTask setShowAddTask3={setShowAddTask3} showAddTask3={showAddTask3}/>
                             </button>
                                 }
                             </div>
                             </div>
                         {/* shared show task thing */}

                         {showTask && selectedTask &&
                          <div className='editTaskView'>
                          <div  className="jc-end just-text-button b-margin bg-white round-sq-05 height-task width-90-per" style={!showTask ? { transform: 'translateX(+105%)' } : {}}>
                              <button className=" width-100-per col just-text-button b-margin bg-white round-sq-05 height-task " >
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
        </DragDropContext>

        )
    } else {
        return (
            <div className='jc-c ai-c'>This project does not exist</div>
        )
    }
}

export default NewViewProject

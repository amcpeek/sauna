import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchOneProject } from '../../store/project'
import { getAllTasksByProjectId } from '../../store/task'
import ViewTask from '../Tasks/ViewTask';
import CreateTask from '../Tasks/CreateTask';
import EditTask from '../Tasks/EditTask';
import EditProjectModal from './EditProjectModal';


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

    //console.log('showAddTask1 in ViewProject', showAddTask1, setShowAddTask1)


    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(id))
        const returnTasks = await dispatch(getAllTasksByProjectId(id))
    }

    useEffect(() => {
       findProjectTest()
    }, [dispatch])

    //edit
    const showTaskFunc = (task) => {
        showTask? setShowTask(false): setShowTask(true)
        setSelectedTask(task)

    }

    let oneProject = useSelector(state => {return state.project[id]})
    let allTasksByProg = useSelector(state => { return state.task.tasksByProjectId})

    let arr = []

    if(allTasksByProg && allTasksByProg[id]) {
        arr = Object.values(allTasksByProg[id])
    }


    if(oneProject) {
        //console.log('allTasksByProg', Object.values(allTasksByProg[id]))
        const toDo = arr.filter(task => task.stageId == 1)
        const inProg = arr.filter(task => task.stageId == 2)
        const complete = arr.filter(task => task.stageId == 3)
        return (
            <div className='col'>
                <div className='col'>
                    {/* <div><Link to={'/'}><i className="fa-solid fa-house-chimney"></i></Link></div>
                    <div className='bg-green small-box round-sq'> AM</div> */}
                    <div><h2>{oneProject.name}</h2></div>
                    <div>{oneProject.description}</div>
                    <div className='long-gray-line tb-margin'></div>
                    {/* <div><Link to={`/projects/${id}/edit`}>Edit Project</Link></div> */}






                </div>
                <div className='f b-margin'>
                    <div>
                        <button onClick={() => setShowModal(true)} className='just-text-button bg-white'>
                        <i className="fa-regular fa-pen-to-square bg-white"></i>
                        </button>
                        <EditProjectModal showModal={showModal} setShowModal={setShowModal}/>
                    </div>
                    <button className='just-text-button do-not-interact bg-white'>Overview</button>
                    <button className='just-text-button do-not-interact bg-white'>Board</button>
                    <button className='just-text-button do-not-interact bg-white'>List</button>
                </div>
                <div className='bg-light-gray'>

                <div className='f width-100-per'>
                    <div className='col width-40-per lr-margin-small'>
                        <h2>To Do <button className='just-text-button' onClick={() => (showAddTask1? setShowAddTask1(false): setShowAddTask1(true))}><i className="fa-solid fa-plus"></i></button></h2>
                        {toDo.map(task=> {
                            return (
                                <button className="f just-text-button b-margin bg-white round-sq-05 height-task" key={task.id} onClick={() => (showTaskFunc(task))}>
                                    {task.name}
                                </button>
                            )
                        })}
                        <div  className="jc-end"
                        // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                        >
                            {showAddTask1 &&
                            <button className=" width-100-per bg-white just-text-button round-sq-05">
                        <CreateTask setShowAddTask1={setShowAddTask1} showAddTask1={showAddTask1}/>
                        {/* this prop thing isnt working yet, doesnt seem to be doing anything actually */}
                        </button>
                            }

                        </div>

                    </div>



                    <div className='col width-40-per lr-margin-small'>
                        <h2>In Progress <button className='just-text-button' onClick={() => ( showAddTask2? setShowAddTask2(false): setShowAddTask2(true))}><i className="fa-solid fa-plus"></i></button></h2>
                        {inProg.map(task=> {
                            return (
                                <button className="f just-text-button b-margin bg-white round-sq-05 height-task" key={task.id} onClick={() => (showTaskFunc(task)) }>
                                    {task.name}
                                </button>
                            )
                        })}
                        <div  className="jc-end"
                        // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                        >
                            {showAddTask2 &&
                            <button className=" width-100-per bg-white just-text-button round-sq-05">
                        <CreateTask setShowAddTask2={setShowAddTask2} showAddTask2={showAddTask2}/>
                        </button>
                            }

                        </div>
                    </div>
                    <div className='col width-40-per lr-margin-small'>
                        <h2>Complete <button className='just-text-button' onClick={() => ( showAddTask3? setShowAddTask3(false): setShowAddTask3(true))}><i className="fa-solid fa-plus"></i></button></h2>
                        {complete.map(task=> {
                            return (
                                <button className="f just-text-button b-margin bg-white round-sq-05 height-task" key={task.id} onClick={() =>  (showTaskFunc(task)) }>
                                    {task.name}
                                </button>
                            )
                        })}
                        <div  className="jc-end"
                        // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                        >
                            {showAddTask3 &&
                            <button className=" width-100-per bg-white just-text-button round-sq-05">
                        <CreateTask setShowAddTask3={setShowAddTask3} showAddTask3={showAddTask3}/>
                        </button>
                            }

                        </div>

                    </div>
                    {showTask &&
                     <div className='f col width-40-per bg-white'>
                     <div  className="jc-end just-text-button b-margin bg-white round-sq-05 height-task" style={!showTask ? { transform: 'translateX(+105%)' } : {}}>
                         <button className=" width-100-per col just-text-button b-margin bg-white round-sq-05 height-task" >
                         {/* onClick={() => setShowTask(false)}  add back in later*/}
                         <ViewTask selectedTask={selectedTask}/>
                         <EditTask selectedTask={selectedTask} showTask={showTask} setShowTask={setShowTask}/>
                         </button>
                     </div>

                 </div>
                    }

                    </div>




                </div>


                {/* <div className='border-orange col'>
                    TASKS:
                    {oneProject.tasks.map(task => {
                    return (
                        <div key={task.id} className='border-blue'>
                        <div>{task.id}. {task.name} Stage: {task.stageId}</div>
                        <br/>
                    </div>
                        )})}
                </div> */}


        </div>

        )
    } else {
        return null
    }
}

export default ViewProject
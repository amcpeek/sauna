import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchOneProject } from '../../../store/project'
import { getAllTasksByProjectId } from '../../../store/task'
import ViewTask from '../../Tasks/ViewTask';
import CreateTask from '../../Tasks/CreateTask';
import EditTask from '../../Tasks/EditTask';
import EditProjectModal from '../EditProject/EditProjectModal';


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

    console.log('showAddTask1 in ViewProject', showAddTask1, setShowAddTask1)


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
            <div className='border-blue col'>
                <div className='border-yellow col'>
                    {/* <div><Link to={'/'}><i className="fa-solid fa-house-chimney"></i></Link></div>
                    <div className='bg-green small-box round-sq'> AM</div> */}
                    <div><h2>{oneProject.name}</h2></div>
                    <div>{oneProject.description}</div>
                    {/* <div><Link to={`/projects/${id}/edit`}>Edit Project</Link></div> */}
                    <div>
                        <button onClick={() => setShowModal(true)} className='circle bg-green'>
                        <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        </div>

                <EditProjectModal showModal={showModal} setShowModal={setShowModal}/>



                </div>

                <div className='border-red'>
                    <button>Overview</button>
                    <button>Board</button>
                    <button>List</button>
                </div>

                <div className='border-green'>
                    <div className='border-blue col width-20-per'>
                        <h2>To Do <button onClick={() => (showAddTask1? setShowAddTask1(false): setShowAddTask1(true))}>+</button></h2>
                        {toDo.map(task=> {
                            return (
                                <button className="border-yellow" key={task.id} onClick={() => (showTaskFunc(task))}>
                                    {task.id}. {task.name}
                                </button>
                            )
                        })}
                        <div  className="border-red jc-end"
                        // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                        >
                            {showAddTask1 &&
                            <button className="arrow-button width-100-per">
                        <CreateTask setShowAddTask1={setShowAddTask1} showAddTask1={showAddTask1}/>
                        {/* this prop thing isnt working yet, doesnt seem to be doing anything actually */}
                        </button>
                            }

                        </div>

                    </div>



                    <div className='border-blue col width-20-per'>
                        <h2>In Progress <button onClick={() => ( showAddTask2? setShowAddTask2(false): setShowAddTask2(true))}>+</button></h2>
                        {inProg.map(task=> {
                            return (
                                <button className="border-yellow" key={task.id} onClick={() => (showTaskFunc(task)) }>
                                    {task.id}. {task.name}
                                </button>
                            )
                        })}
                        <div  className="border-red jc-end"
                        // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                        >
                            {showAddTask2 &&
                            <button className="arrow-button width-100-per">
                        <CreateTask setShowAddTask2={setShowAddTask2} showAddTask2={showAddTask2}/>
                        </button>
                            }

                        </div>
                    </div>
                    <div className='border-blue col width-20-per'>
                        <h2>Complete <button onClick={() => ( showAddTask3? setShowAddTask3(false): setShowAddTask3(true))}>+</button></h2>
                        {complete.map(task=> {
                            return (
                                <button className="border-yellow" key={task.id} onClick={() =>  (showTaskFunc(task)) }>
                                    {task.id}. {task.name}
                                </button>
                            )
                        })}
                        <div  className="border-red jc-end"
                        // style={!showAddTask ? { transform: 'translateX(+100%)' } : {}}
                        >
                            {showAddTask3 &&
                            <button className="arrow-button width-100-per">
                        <CreateTask setShowAddTask3={setShowAddTask3} showAddTask3={showAddTask3}/>
                        </button>
                            }

                        </div>

                    </div>
                    <div className='border-blue col width-40-per'>
                        <div  className="border-red jc-end" style={!showTask ? { transform: 'translateX(+105%)' } : {}}>
                            <button className="arrow-button width-100-per col " >
                            {/* onClick={() => setShowTask(false)}  add back in later*/}
                            <ViewTask selectedTask={selectedTask}/>
                            <EditTask selectedTask={selectedTask} showTask={showTask} setShowTask={setShowTask}/>
                            </button>
                        </div>

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

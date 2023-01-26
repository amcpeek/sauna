import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchOneProject } from '../../../store/project'
import ViewTask from '../../Tasks/ViewTask';


const ViewProject = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [selectedTask, setSelectedTask] = useState(1)
    const [showTask, setShowTask] = useState(false)


    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(id))
    }

    useEffect(() => {
       findProjectTest()
    }, [dispatch])

    let oneProject = useSelector(state => {return state.project[id]})

    if(oneProject) {
        const toDo = oneProject.tasks.filter(task => task.stageId == 1)
        const inProg = oneProject.tasks.filter(task => task.stageId == 2)
        const complete = oneProject.tasks.filter(task => task.stageId == 3)
        console.log('todo', toDo)
        return (
            <div className='border-blue col'>
                <div className='border-yellow'>
                    <div><i className="fa-solid fa-house-chimney"></i></div>
                    <div className='bg-green small-box round-sq'> AM</div>
                    <div>{oneProject.name}</div>
                    <div><Link to={`/projects/${id}/edit`}>Edit Project</Link></div>
                </div>

                <div className='border-red'>
                    <button>Overview</button>
                    <button>Board</button>
                    <button>List</button>
                </div>

                <div className='border-green'>
                    <div className='border-blue col width-20-per'>
                        <h2>To Do</h2>
                        {toDo.map(task=> {
                            return (
                                <button className="border-yellow" key={task.id} onClick={() => (setShowTask(true),
                                    setSelectedTask(task)) }>
                                    {task.id}. {task.name}
                                </button>
                            )
                        })}

                    </div>
                    <div className='border-blue col width-20-per'>
                        <h2>In Progress</h2>
                        {inProg.map(task=> {
                            return (
                                <button className="border-yellow" key={task.id} onClick={() => (setShowTask(true),
                                    setSelectedTask(task)) }>
                                    {task.id}. {task.name}
                                </button>
                            )
                        })}

                    </div>
                    <div className='border-blue col width-20-per'>
                        <h2>Complete</h2>
                        {complete.map(task=> {
                            return (
                                <button className="border-yellow" key={task.id} onClick={() => (setShowTask(true),
                                    setSelectedTask(task)) }>
                                    {task.id}. {task.name}
                                </button>
                            )
                        })}

                    </div>
                    <div className='border-blue col width-40-per'>
                        <div  className="border-red jc-end" style={!showTask ? { transform: 'translateX(+100%)' } : {}}>
                            <button className="arrow-button width-100-per" onClick={() => setShowTask(false)}>
                            <ViewTask selectedTask={selectedTask}/>
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

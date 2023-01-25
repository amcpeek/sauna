import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchOneProject } from '../../../store/project'


const ViewProject = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()


    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(id))
    }


    useEffect(() => {
       findProjectTest()
    }, [dispatch])

    let oneProject = useSelector(state => {return state.project[id]})

    return (
        <div>
            <div><i className="fa-solid fa-house-chimney"></i></div>
            <div className='bg-green small-box round-sq'></div>
        {oneProject && (
            <div>
                {oneProject.name}
                <button>edit & delete</button>
                <br/>
                <br/>
            {oneProject.description}
            <br/>
            <br/>
            TASKS:
            <br/>
            {oneProject.tasks.map(task => {
    return (
        <div>
        <div>{task.id}. {task.name} Stage: {task.stageId}</div>
        <br/>
       </div>
    )})}
                </div>
       )}
       <Link to={`/projects/${id}/edit`}>Edit Project</Link>
        </div>
    )

}

export default ViewProject

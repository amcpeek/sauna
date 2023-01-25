import { useParams, useHistory } from 'react-router-dom';
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
        <div>Single Project:
            <br/>
            <br/>
        {oneProject && (
            <div>
                Name: {oneProject.name}
                <br/>
                <br/>
            Description: {oneProject.description}
            <br/>
            <br/>
            {oneProject.tasks.map(task => {
    return (
        <div>
        <div>{task.id}. {task.name}</div>
        <br/>
       </div>
    )})}
                </div>
       )}
        </div>
    )

}

export default ViewProject

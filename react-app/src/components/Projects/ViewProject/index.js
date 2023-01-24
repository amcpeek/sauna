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
        <div>the view project page!
        {oneProject &&
            <div>{oneProject.name} <br/>
            {oneProject.description}</div>
        }
        </div>
    )

}

export default ViewProject

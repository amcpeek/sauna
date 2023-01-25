import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllProjects } from '../../../store/project'


const ViewAllProjects = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    const findProjectTest = async () => {
        const returnProjects = await dispatch(fetchAllProjects())
    }


    useEffect(() => {
       findProjectTest()
    }, [dispatch])

    let allProjectsObj = useSelector(state => {return state.project})
    let allProjects = Object.values(allProjectsObj)
    //console.log('oneProject', allProjects[0].name)

    return (
        <div>
            <div>All Projects & Home Page</div>
            <Link to={`/projects/create`}>Create Project</Link>

            <br/>
            <br/>
        {allProjects && (allProjects.map(project => {
            return (
                <Link to={`/projects/${project.id}`}>
                <div>
                <div>{project.id}.</div>
                <div>Name: {project.name}:</div>
                <div>Description: {project.description}</div>
                <br/>

                </div>
                </Link>
            )


        }))
        }
        </div>
    )

}

export default ViewAllProjects

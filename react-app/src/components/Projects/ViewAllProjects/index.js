import { useHistory } from 'react-router-dom';
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
            <div>welcome and see all the projects!</div>

            <br/>
        {allProjects && (allProjects.map(project => {
            return (
                <div>
                <div>{project.name}:</div>
                <div>{project.description}</div>
                <br/>

                </div>
            )


        }))
        }
        </div>
    )

}

export default ViewAllProjects

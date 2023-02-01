import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllProjects } from '../../store/project'

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


    return (
        <div>
            <div className='f'>
                            <div className='main-left col main-left lr-margin'>
                                <div className='col main-left-proj'>
                                    {allProjects && (allProjects.map(project => {
                                        return (
                                            <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
                                            <div>

                                                <div className='short-gray-line'></div>

                                            <h3 className='text-blue'> <i className="fa-solid fa-user-plus"></i> {project.name}:</h3>
                                            <div className='col'>

                                            <h5>Team Lead: {project.owner.username} <br/> {project.description}</h5>

                                            </div>

                                            <br/>

                                            </div>
                                            </Link>
                                            )


                                        }))
                                        }
                                </div>
                            </div>
           <div className='main-gray-box'>

                <img className='main-img-1'
                src='https://assets.asana.biz/transform/5e1c89aa-e1af-44f5-8902-f692c819c3b2/home-hero-1a'
                alt='home1'
                />
                <img className='main-img-2'
                src='https://assets.asana.biz/transform/efb32754-4aa7-4fd8-ba6f-2d019316dd4a/home-hero-1b'
                alt='home2'
                />
                {/* <div className='main-gray-box'></div> */}
            </div>
            </div>

        </div>
    )

}

export default ViewAllProjects

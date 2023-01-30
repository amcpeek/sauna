import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllProjects } from '../../store/project'
import { authenticate } from '../../store/session';
import CreateProjectModal from '../Projects/CreateProjectModal';

const ProfilePage = () => {


    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);

    const findProjectTest = async () => {
        const returnProjects = await dispatch(fetchAllProjects())
        const returnUser = await dispatch(authenticate())
    }


    useEffect(() => {
       findProjectTest()
    }, [dispatch])
    let user = useSelector(state => {return state.session.user})
    let allProjectsObj = useSelector(state => {return state.project})
    let allProjects = Object.values(allProjectsObj)
    let curUsersProjects = []

    if(user && allProjects)  {
        curUsersProjects = allProjects.filter(project => project.ownerId ==  user.id)
    }
    if(user && curUsersProjects.length) {
        console.log('plan a')

        return (
            <div className='f'>
            <div className='main-left col main-left lr-margin'>
                <div>
                    <h1>Listed here are the projects you own:</h1>
                </div>

            <div className='col main-left-proj'>
            {curUsersProjects && (curUsersProjects.map(project => {
                return (
                    <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
                    <div>

                        <div className='short-gray-line'></div>

                    <h3 className='text-blue'> {project.name}:</h3>
                    <div className='col'>

                    <h5>{project.description}</h5>

                    </div>

                    <br/>

                    </div>
                    </Link>
                    )


                }))
                }
        </div>
        </div>
        </div>

        )

    } else if (user && allProjects) {
        return (
            <div className='f'>
            <div className='main-left col main-left lr-margin'>
                <div>
                    <h1>You do not currently own any projects.</h1>
                    <button onClick={() => setShowModal(true)} className='thin-bor bg-white text-blue circle'>Create a project here</button>
                <CreateProjectModal showModal={showModal} setShowModal={setShowModal}/>
                </div>
                </div>
                </div>
        )

    } else {
        return (
            <div>There are no projects</div>
        )
    }


}

export default ProfilePage

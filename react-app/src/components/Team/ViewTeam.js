import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams, fetchOneTeam } from '../../store/team'
import { authenticate } from '../../store/session';

const ViewTeam = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneTeam(id))
        const returnUser = await dispatch(authenticate())
    }

    useEffect(() => {
       findProjectTest()
    }, [dispatch])

    let oneTeamObj = useSelector(state => {return state.team[id]})

    if (oneTeamObj) {

    return (
        <div className='main-left col main-left lr-margin'>
            <div className='col main-left-proj'>

                    <div>

                    <div className='text-blue'>{oneTeamObj.name}</div>
                    <div>Team Lead: {oneTeamObj.owner.username}</div>
                    <div>{oneTeamObj.description}</div>
                    <br/>
                    <div>Team Members:

                    </div>
                    {oneTeamObj.memberships.map(member => {
                        return (
                            <div>
                          <div> {member.users[0].username}</div>
                      </div>
                        )
                    })}
                    <br/>
                    </div>
                {oneTeamObj.projects.map(project => {
                    return (
                        <div>

                        <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
                        <div>

                            <div className='short-gray-line'></div>

                        <h3 className='text-blue'> <i className="fa-solid fa-user-plus"></i>{project.name}</h3>
                        <div className='col'>

                        <h5>Project Lead: {project.owner.username} <br/>{project.description}</h5>

                        </div>

                        <br/>

                        </div>
                        </Link>
                        </div>
                        )


                    })
                    }
            </div>
        </div>
    )
    } else {
        return (null)
    }
}

export default ViewTeam

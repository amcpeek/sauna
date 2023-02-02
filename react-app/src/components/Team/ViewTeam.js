import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams, fetchOneTeam } from '../../store/team'
import { authenticate } from '../../store/session';
import CreateProjectModal from '../Projects/CreateProjectModal';

const ViewTeam = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);

    // console.log('IS THE ERROR HAPPENING AFTER GETTING TO VIEW TEAM PAGE?')

    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneTeam(id))
        const returnUser = await dispatch(authenticate())
    }

    let user = useSelector(state => {return state.session.user})

    useEffect(() => {
       findProjectTest()
    }, [dispatch])

    let oneTeamObj = useSelector(state => {return state.team[id]})

    if (oneTeamObj) {

    return (
        <div className='main-left col main-left lr-margin'>
            <div className='col main-left-proj'>

                    <div>
                    <div>Team Information:</div>
                    <div className='text-blue'>{oneTeamObj.name}</div>
                    <div>Team Lead: {oneTeamObj.owner.username}</div>
                    <div>{oneTeamObj.description}</div>
                    <br/>
                    <div>Team Members:
                    {oneTeamObj.memberships && !oneTeamObj.memberships.length && (<div>Your team does not yet have any members</div>)}

                    </div>
                    {oneTeamObj.memberships && oneTeamObj.memberships.map(member => {
                        return (
                            <div>
                          <div> {member.users[0].username}</div>
                      </div>
                        )
                    })}
                    <br/>

                    </div>
                    <div>Team's Projects:</div>
                      {user &&
                      <div className='ai-c'>

                        <button onClick={() => setShowModal(true)} className='just-text-button thin-bor bg-white cursor tb-margin'>Create New Project</button>
                        <CreateProjectModal showModal={showModal} setShowModal={setShowModal}/>
                      </div>
                      }
                    {oneTeamObj.projects && !oneTeamObj.projects.length && (<div>Your team does not yet have any projects</div>)}
                {oneTeamObj.projects && oneTeamObj.projects.map(project => {
                    return (
                        <div>

                        <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
                        <div>

                            <div className='short-gray-line'></div>

                        <h3 className='text-blue'> <i className="fa-solid fa-user-plus"></i>{project.name}</h3>
                        <div className='col'>
                            {project.owner && (
                                <h5>Project Lead: {project.owner.username} <br/>{project.description}</h5>
                            )}



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

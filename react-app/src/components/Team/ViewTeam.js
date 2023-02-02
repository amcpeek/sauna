import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams, fetchOneTeam } from '../../store/team'
import { authenticate } from '../../store/session';
import CreateProjectModal from '../Projects/CreateProjectModal';
import { fetchCreateMembership } from '../../store/membership';
import EditTeamModal from './EditTeamModal';

const ViewTeam = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPModal, setShowPModal] = useState(false);
    const [showTModal, setShowTModal] = useState(false);
    const [sentTeamId, setSentTeamId] = useState(0)

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

    const handleCreateMembership = async (teamId) => {
        await dispatch(fetchCreateMembership(teamId))
        .then(dispatch(fetchAllTeams()))
        //   .then(history.push(`/profile`)) //this isn't working at all
          .catch(async (err) => {
           // console.log('5555555555', err)
          })
     }

    if (oneTeamObj && oneTeamObj.memberships) {

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
                    {user.id == oneTeamObj.owner.id && (
                        <div className='f vh-5 lr-margin-small ai-c'>
                        <button onClick={() => (setShowTModal(true), setSentTeamId(oneTeamObj.id)) } className='just-text-button bg-white'>Edit Team
                        <i className="fa-regular fa-pen-to-square bg-white cursor"></i> {oneTeamObj.id}
                        </button>
                        <EditTeamModal showTModal={showTModal} setShowTModal={setShowTModal} sentTeamId={sentTeamId}/>
                        </div>

                    )}


                      {user &&
                      <div className='ai-c'>

                        {oneTeamObj.memberships.find(member => member.users[0].id == user.id)?

                        <div>You are a member of this team
                           <button onClick={() => setShowPModal(true)} className='just-text-button thin-bor bg-white cursor tb-margin'>Create New Project</button>
                        <CreateProjectModal showPModal={showPModal} setShowPModal={setShowPModal}/>
                        </div>
                        :
                        <button onClick={() => handleCreateMembership(oneTeamObj.id)}>Join Team</button>
                        }
                      </div>
                      }
                      {oneTeamObj.projects && !oneTeamObj.projects.length && (<div>Your team does not yet have any projects</div>)}
                      {oneTeamObj.projects && oneTeamObj.projects.map(project => {
                      return (
                        <div>
                             <div>Team's Projects:</div>

                        <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
                        <div>

                            <div className='short-gray-line'></div>

                        <h3 className='text-blue'>
                        {/* <i className="fa-solid fa-user-plus"></i> */}
                        {project.name}</h3>
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

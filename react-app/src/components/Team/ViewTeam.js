import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams, fetchOneTeam } from '../../store/team'
import { authenticate } from '../../store/session';
import CreateProjectModal from '../Projects/CreateProjectModal';
import { fetchCreateMembership } from '../../store/membership';
import EditTeamModal from './EditTeamModal';
import arrayOfColors from '../../assets/ArrayOfColors';


const ViewTeam = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false); //for projects
    const [showTModal, setShowTModal] = useState(false); //for teams
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
            <div className="col lr-margin-large">
            <h2 className='should-wrap-70'>{oneTeamObj.name}</h2>

            <div className="col">
                <div className='tb-margin'>About Us</div>
                <div className='long-gray-line'></div>
                <div className='should-wrap-100-per tb-margin'>
                {oneTeamObj.description}
                </div>
                {user && user.id == oneTeamObj.owner.id && (
                        <div className=' vh-5 ai-c jc-st'>
                        <button onClick={() => (setShowTModal(true), setSentTeamId(oneTeamObj.id)) } className='no-bor bg-white row'>
                        <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
                        </button>
                        <EditTeamModal showTModal={showTModal} setShowTModal={setShowTModal} sentTeamId={sentTeamId}/>
                        </div>

                    )}

            </div>

            <div>
                            <div> </div>
                            <div className='tb-margin'>Team Lead</div>
                <div className='long-gray-line'></div>
                            <div className='row ai-c width-members tb-margin'>
                        <div className='solid-circle jc-c ai-c font-small-med pad-04'
                        style={{backgroundColor: arrayOfColors[oneTeamObj.owner.id]}}>{oneTeamObj.owner.username.slice(0,2)}</div>
                        <div>&nbsp;&nbsp;&nbsp;{oneTeamObj.owner.username}</div>
                    </div>
                        </div>



            <div className='col t-margin jc-c'>
                <div className='tb-margin'>Members ({oneTeamObj.memberships.length})</div>
                <div className='long-gray-line'></div>
                <div className='row flex-wrap'>

                        {user &&
                        (!(oneTeamObj.memberships.find(member => member.users[0].id == user.id)) && (
                            <div className='row ai-c width-members tb-margin'>
                                <button className='no-bor bg-white jc-st ai-c cursor pad-0' onClick={() => handleCreateMembership(oneTeamObj.id)}>
                                <div className='dotted-circle jc-c ai-c font-small-med pad-04'>
                                <i className="fa-solid fa-plus"></i>
                                </div>

                                <div className='font-med'>&nbsp; Join Team</div>
                                </button>
                            </div>
                        ))}

                        <div className='ai-c jc-c'>
                        {oneTeamObj.memberships && !oneTeamObj.memberships.length && (<div  >This team does not yet have any members</div>)}
                        </div>


                        {oneTeamObj.memberships && oneTeamObj.memberships.map(member => {
                            return (
                                <div>
                            <div> </div>
                            <div className='row ai-c width-members tb-margin'>
                        <div className='solid-circle jc-c ai-c font-small-med pad-04'
                        style={{backgroundColor: arrayOfColors[member.users[0].id]}}>{member.users[0].username.slice(0,2)}</div>
                        <div>&nbsp;&nbsp;&nbsp;{member.users[0].username}</div>
                    </div>
                        </div>
                            )
                        })}
                </div>

            </div>

            <div className='tb-margin'>Projects</div>
            <div className='long-gray-line'></div>

            {user &&
                      <div className='ai-c'>
                        {oneTeamObj.memberships.find(member => member.users[0].id == user.id) &&
                        <div  className='row ai-c tb-margin'>
                           <button onClick={() => setShowModal(true)} className='no-bor bg-white jc-st ai-c cursor pad-0'>
                            <div className='dotted-round-sq jc-c ai-c font-small-med pad-02'>
                                <i className="fa-solid fa-plus"></i>
                                </div>
                                <div className='font-med'>&nbsp; New Project</div>
                            </button>
                        <CreateProjectModal showModal={showModal} setShowModal={setShowModal}/>
                        </div>
                        }
                      </div>
                      }

            <div className='long-gray-line'></div>
            {oneTeamObj.projects && !oneTeamObj.projects.length && (<div>This team does not yet have any projects</div>)}

            {oneTeamObj.projects && oneTeamObj.projects.map(project => {
                      return (
                        <div>
                        <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
                        <div className='row ai-c tb-margin jc-sb'>
                            <div className='row'>
                                <div className='solid-round-sq jc-c ai-c' style={{backgroundColor: arrayOfColors[project.id]}}><i className="fa-solid fa-list-ul"></i></div>
                                <div className=''>&nbsp; {project.name} </div>
                            </div>
                            <div className='solid-circle jc-c ai-c font-small-med pad-04' style={{backgroundColor: arrayOfColors[project.owner.id]}}>{(project.owner.username).slice(0,2)}</div>
                        </div>
                        <div className='long-gray-line'></div>
                            </Link>
                            </div>)})}
            </div>
        )
    } else {
        return (null)
    }
}
export default ViewTeam

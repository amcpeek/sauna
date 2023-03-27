// import { useParams, useHistory, Link } from 'react-router-dom';
// import { useDispatch, useSelector} from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { fetchAllTeams, fetchOneTeam } from '../../store/team'
// import { authenticate } from '../../store/session';
// import CreateProjectModal from '../Projects/CreateProjectModal';
// import { fetchCreateMembership } from '../../store/membership';
// import EditTeamModal from './EditTeamModal';

// const NewTeam = () => {
//     const { id } = useParams()
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const [showModal, setShowModal] = useState(false); //for projects
//     const [showTModal, setShowTModal] = useState(false); //for teams
//     const [sentTeamId, setSentTeamId] = useState(0)

//     // console.log('IS THE ERROR HAPPENING AFTER GETTING TO VIEW TEAM PAGE?')

//     const findProjectTest = async () => {
//         const returnProject = await dispatch(fetchOneTeam(id))
//         const returnUser = await dispatch(authenticate())
//     }

//     let user = useSelector(state => {return state.session.user})

//     useEffect(() => {
//        findProjectTest()
//     }, [dispatch])

//     let oneTeamObj = useSelector(state => {return state.team[id]})

//     const handleCreateMembership = async (teamId) => {
//         await dispatch(fetchCreateMembership(teamId))
//         .then(dispatch(fetchAllTeams()))
//         //   .then(history.push(`/profile`)) //this isn't working at all
//           .catch(async (err) => {
//            // console.log('5555555555', err)
//           })
//      }

//     if (oneTeamObj && oneTeamObj.memberships) {

//     return (
//         <div className='main-left col main-left lr-margin'>
//             <div className='col main-left-proj'>

//                     <div>
//                        {/* <div>Team Information:</div> */}
//                         <h1 className='should-wrap-70'>{oneTeamObj.name}</h1>
//                         <h4 className='text-blue'>Team Lead: {oneTeamObj.owner.username}</h4>
//                         <div className='should-wrap-70'>{oneTeamObj.description}</div>
//                         <br/>
//                         <div className='text-blue'>Team Members:
//                         {oneTeamObj.memberships && !oneTeamObj.memberships.length && (<div>Your team does not yet have any members</div>)}

//                         </div>
//                         {oneTeamObj.memberships && oneTeamObj.memberships.map(member => {
//                             return (
//                                 <div>
//                             <div> {member.users[0].username}</div>
//                         </div>
//                             )
//                         })}
//                         <br/>
//                     </div>
//                     {user && user.id == oneTeamObj.owner.id && (
//                         <div className=' vh-5 ai-c jc-st'>
//                         <button onClick={() => (setShowTModal(true), setSentTeamId(oneTeamObj.id)) } className='asana-button row'>Edit Team &nbsp;
//                         <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
//                         </button>
//                         <EditTeamModal showTModal={showTModal} setShowTModal={setShowTModal} sentTeamId={sentTeamId}/>
//                         </div>

//                     )}

//                       {user &&
//                       <div className='ai-c'>

//                         {oneTeamObj.memberships.find(member => member.users[0].id == user.id)?

//                         <div>
//                            <button onClick={() => setShowModal(true)} className='asana-button'>Create New Project</button>
//                         <CreateProjectModal showModal={showModal} setShowModal={setShowModal}/>
//                         </div>
//                         :
//                         <button className='asana-button' onClick={() => handleCreateMembership(oneTeamObj.id)}>Join Team</button>
//                         }
//                       </div>
//                       }
//                       <h2 className='text-blue'>Team's Projects</h2>
//                       {oneTeamObj.projects && !oneTeamObj.projects.length && (<div>This team does not yet have any projects</div>)}

//                       {oneTeamObj.projects && oneTeamObj.projects.map(project => {
//                       return (
//                         <div>

//                         <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
//                         <div>

//                             <div className='short-gray-line'></div>

//                         <h3 className='text-blue should-wrap-70'>
//                         {/* <i className="fa-solid fa-user-plus"></i> */}
//                         {project.name}</h3>
//                         <div className='col should-wrap-70'>
//                             {project.owner && (
//                                 <h5>Project Lead: {project.owner.username} <br/>{project.description}</h5>
//                             )}
//                         </div>
//                         <br/>
//                         </div>
//                         </Link>
//                         </div>
//                         )
//                     })
//                     }
//             </div>
//         </div>
//     )
//     } else {
//         return (null)
//     }
// }

// export default NewTeam

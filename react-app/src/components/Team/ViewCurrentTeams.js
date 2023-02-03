import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector, useStore} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams } from '../../store/team'
import { authenticate } from '../../store/session';
import EditTeamModal from './EditTeamModal';
import CreateTeamModal from './CreateTeamModal';
import {fetchDeleteMembership} from '../../store/membership'
import { fetchAllTasks } from '../../store/task'

//note shows currently if member

const ProfilePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showTModal, setShowTModal] = useState(false);
    const [sentTeamId, setSentTeamId] = useState(0)

    const findProjectTest = async () => {
        const returnTeams = await dispatch(fetchAllTeams())
        const returnUser = await dispatch(authenticate())
        const returnTasks = await dispatch(fetchAllTasks())
    }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

    let user = useSelector(state => {return state.session.user})
    let allTeamsObj = useSelector(state => {return state.team})
    let allTeams = Object.values(allTeamsObj)
    let allTasksObj = useSelector(state => {return state.task} )
    let allTasks = Object.values(allTasksObj)
    let curUsersTeams = []
    let ownersTeams = []
    let curTasks = []
    if(user && allTeams) {
        for(let i in allTeams) {
            for (let j in allTeams[i].memberships) {
                if(allTeams[i].memberships[j].userId == user.id ) {
                    curUsersTeams.push(allTeams[i])
                    console.log(allTeams[i].memberships[j].userId, user.id, )
                     break
                }
           }
           if(allTeams[i].ownerId == user.id) {
            ownersTeams.push(allTeams[i])
           }

        }
    }
    if(allTasks) {
        console.log('alkdjfalkjfadklfjadklfjflkadj',allTasks)
        curTasks = allTasks.filter(task => task.assigneeId == user.id)
        console.log(curTasks)


    }

    const handleRemoveMembership = async (teamId) => {
        await dispatch(fetchDeleteMembership(teamId))
        await dispatch(fetchAllTeams())
          history.push('/profile')
     }

     if(user && ownersTeams && curUsersTeams) {
        if(!ownersTeams.length && !curUsersTeams.length) {
            return (
                <div className='f'>
            <div className='main-left col lr-margin'>
                <h1>You are not currently part of any teams or own any teams</h1>
                <Link to='/teams'>join a team or create a team</Link>
                </div>
                </div>

            )
        }
        return (
            <div  className='jc-c row lr-margin-10-vw'>
                {user && ownersTeams.length > 0 && (
                      <div className='col main-left-proj lr-margin-small width-20-vw '>

                      <h2 className='tb-margin'>Team Owner</h2>
                      {ownersTeams && (ownersTeams.map(team => {
                          return (
                              <div>
                              <Link key={team.id} to={`/teams/${team.id}`} className='no-und'>
                                  <div className='short-gray-line'></div>
                              <h3 className='text-blue should-wrap'>{team.name}</h3>
                              <div className='col'>
                              <h5 className='should-wrap'>Team Lead: {team.owner.username} <br/> {team.description}</h5>
                              </div>
                              </Link>
                              <br/>
                              {/* {team.owner.id == user.id && (
                                  <div className='f vh-5 lr-margin-small ai-c'>
                                  <button onClick={() => (setShowTModal(true), setSentTeamId(team.id)) } className='just-text-button bg-white'>Edit Team
                                  <i className="fa-regular fa-pen-to-square bg-white cursor"></i>
                                  </button>
                                  <EditTeamModal showTModal={showTModal} setShowTModal={setShowTModal} sentTeamId={sentTeamId}/>
                                  </div>
                              )} */}
                              </div>
                              )
                          }))
                          }
                           <div className='ai-st  col'>
                        <button onClick={() => setShowTModal(true)} className='asana-button'>Create New Team</button>
                        <CreateTeamModal showTModal={showTModal} setShowTModal={setShowTModal}/>

                      </div>
                      </div>
                )}
                {user && curUsersTeams.length > 0  && (
                    <>
                     <div className='col main-left-proj lr-margin-small width-20-vw'>
                     <h2 className='tb-margin'>Team Member</h2>
                         {curUsersTeams && (curUsersTeams.map(team => {
                             return (
                                 <div>
                                 <Link key={team.id} to={`/teams/${team.id}`} className='no-und'>
                                 <div className='short-gray-line'></div>

                                 <h3 className='text-blue should-wrap'>{team.name}</h3>
                                 <div className='col'>
                                 <h5 className='should-wrap'>Team Lead: {team.owner.username} <br/> {team.description}</h5>
                                 </div>
                                 </Link>
                                 <button className='asana-button margin-b-2' onClick={() => handleRemoveMembership(team.id)}>Leave Team</button>

                                 </div>
                                 )
                             }))
                             }
                     </div>
                     <div className='col main-left-proj lr-margin-small width-20-vw'>
                     <h2 className='tb-margin'>Tasks Assigned to you</h2>
                     <div className='short-gray-line'></div>
                     {curTasks && curTasks.length > 0 && (curTasks.map(task => {
                        return ( <div>
                            <Link to={`/projects/${task.projectId}`} className='no-und cursor'>
                            <h3 className='text-blue tb-margin'>{task.name}</h3>
                            <h5 className='should-wrap'>{task.description}</h5>
                            </Link>
                            </div>

                        )
                     })


                        )
                     }

                     </div>

                     </>

                )}


            </div>


         )

    } else {
        return ( <div>There are no projects</div> )
    }
}
export default ProfilePage

//BELOW IS THE VERSION WHERE IT SHOWS THE CURRENT USERS PROJECTS
  // const dispatch = useDispatch()
    // const history = useHistory()
    // const [showTModal, setShowTModal] = useState(false);

    // const findProjectTest = async () => {
    //     const returnProjects = await dispatch(fetchAllProjects())
    //     const returnUser = await dispatch(authenticate())
    // }


    // useEffect(() => {
    //    findProjectTest()
    // }, [dispatch])
    // let user = useSelector(state => {return state.session.user})
    // let allProjectsObj = useSelector(state => {return state.project})
    // let allProjects = Object.values(allProjectsObj)
    // let curUsersProjects = []

    // if(user && allProjects)  {
    //     curUsersProjects = allProjects.filter(project => project.ownerId ==  user.id)
    // }
    // if(user && curUsersProjects.length) {
    //     console.log('plan a')

    //     return (
    //         <div className='f'>
    //         <div className='main-left col main-left lr-margin'>
    //             <div>
    //                 <h1>Listed here are the projects you own:</h1>
    //             </div>

    //         <div className='col main-left-proj'>
    //         {curUsersProjects && (curUsersProjects.map(project => {
    //             return (
    //                 <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
    //                 <div>

    //                     <div className='short-gray-line'></div>

    //                 <h3 className='text-blue'> {project.name}:</h3>
    //                 <div className='col'>

    //                 <h5>{project.description}</h5>

    //                 </div>

    //                 <br/>

    //                 </div>
    //                 </Link>
    //                 )


    //             }))
    //             }
    //     </div>
    //     </div>
    //     </div>

    //     )

    // } else if (user && allProjects) {
    //     return (
    //         <div className='f'>
    //         <div className='main-left col main-left lr-margin'>
    //             <div>
    //                 <h1>You do not currently own any projects.</h1>
    //                 <button onClick={() => setShowTModal(true)} className='thin-bor bg-white text-blue circle'>Create a project here</button>
    //             <CreateProjectModal showTModal={showTModal} setShowTModal={setShowTModal}/>
    //             </div>
    //             </div>
    //             </div>
    //     )

    // } else {
    //     return (
    //         <div>There are no projects</div>
    //     )
    // }

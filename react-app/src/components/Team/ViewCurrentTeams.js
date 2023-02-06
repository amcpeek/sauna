import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector, useStore} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams } from '../../store/team'
import { authenticate } from '../../store/session';
import EditTeamModal from './EditTeamModal';
import CreateTeamModal from './CreateTeamModal';
import {fetchDeleteMembership} from '../../store/membership'
import { fetchAllTasks } from '../../store/task'
import arrayOfColors from '../../assets/ArrayOfColors';
import { fetchAllProjects } from '../../store/project';
import CreateProjectModal from '../Projects/CreateProjectModal';


const ProfilePage = () => {
    const [ toDo, setToDo] = useState(true)
    const [ inProg, setInProg] = useState(false)
    const [ comp, setComp] = useState(false)
    let toDoCur, inProgCur, compCur = []
    const oneTeamObj = 0

    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false); //for projects
    const [showTModal, setShowTModal] = useState(false);
    const [sentTeamId, setSentTeamId] = useState(0)

    const findProjectTest = async () => {
        const returnTeams = await dispatch(fetchAllTeams())
        const returnUser = await dispatch(authenticate())
        const returnTasks = await dispatch(fetchAllTasks())
        const returnProjects = await dispatch(fetchAllProjects())
    }

    const today = new Date()
    const todayFormatted =  (new Intl.DateTimeFormat('default', { dateStyle: 'full' }).format(today))
    const options = {

        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'America/Los_Angeles'
      };
    const timeOfDay = (new Intl.DateTimeFormat('default', options).format(today))

    console.log('timeofday', timeOfDay)

    const first2 = timeOfDay.slice(0,2)
    console.log(first2)

    let greeting = 'Welcome'
    if (first2 > 0 && first2 < 12) {
        greeting = 'Good Morning'
    } else if (first2 >= 12 && first2 <= 17) {
        greeting = 'Good Afternoon'
    } else if (first2 > 17) {
        greeting = 'Good Evening'
    }






    useEffect(() => {
        findProjectTest()
     }, [dispatch])

    let user = useSelector(state => {return state.session.user})
    let allTeamsObj = useSelector(state => {return state.team})
    let allTeams = Object.values(allTeamsObj)
    let allTasksObj = useSelector(state => {return state.task} )
    let allTasks = Object.values(allTasksObj)
    let allProjectsObj = useSelector(state => { return state.project})
    let allProjects = Object.values(allProjectsObj)

    let curUsersTeams = []
    let ownersTeams = []
    let curTasks = []
    // let curProjects = []
    let allMyProjectsSubArrays = []
    if(user && allTeams) {
        for(let i in allTeams) {
            for (let j in allTeams[i].memberships) {
                if(allTeams[i].memberships[j].userId == user.id ) {
                    curUsersTeams.push(allTeams[i])
                    allMyProjectsSubArrays.push(allTeams[i].projects)
                    //console.log(allTeams[i].memberships[j].userId, user.id, )
                     break
                }
           }
           if(allTeams[i].ownerId == user.id) {
            ownersTeams.push(allTeams[i])
           }
        }
    }
    if(allTasks) {
        curTasks = allTasks.filter(task => task.assigneeId == user.id)
        toDoCur = curTasks.filter(task => task.stageId == 1)
        inProgCur = curTasks.filter(task => task.stageId == 2)
        compCur = curTasks.filter(task => task.stageId == 3)
    }

    console.log('allMyProjects', allMyProjectsSubArrays)

    let allMyProjects = []
    if (allMyProjectsSubArrays) {
        for(let i in allMyProjectsSubArrays) {
            for (let j in allMyProjectsSubArrays[i]) {
                allMyProjects.push(allMyProjectsSubArrays[i][j])
            }
        }
    }
    console.log('allMyProjects', allMyProjects)

    //this is the problem
    // if(allProjects) {
    //     curProjects = allProjects.filter(project => project.ownerId == user.id )
    // }

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
                <h1>You are not currently part of any teams, so you do not have access to teams, projects, or tasks</h1>
                <Link className='text-blue' to='/teams'>join a team or create a team</Link>
                </div>
                </div>

            )
        }
    }


    return (
        <div className="col lr-margin jc-c ai-c">
            <div>{todayFormatted.slice(0, -6)}</div>
            <h1>{greeting}, {user.username}</h1>
            <div className='row'>
                <div className='profile-box'>

                    <div className='row ai-c width-members tb-margin lr-margin-small'>
                        <div className='solid-circle jc-c ai-c font-small-med pad-04'
                        style={{backgroundColor: arrayOfColors[user.id]}}>{user.username.slice(0,2)}</div>
                        <div>&nbsp;&nbsp;&nbsp;Tasks</div>
                    </div>

                    <div className='row jc-sa lr-margin-small'>
                        <div>
                        <button className='font-small-med no-bor bg-white' onClick={() => (setToDo(true), setInProg(false), setComp(false))}>To Do ({toDoCur && (toDoCur.length)}) </button>
                        {toDo && <div className='gray-line-med'></div> }
                        </div>
                        <div>
                        <button className='font-small-med no-bor bg-white' onClick={() => (setToDo(false), setInProg(true), setComp(false))}>In Progress ({inProgCur && (inProgCur.length)}) </button>

                        {inProg && <div className='gray-line-med'></div> }

                        </div>
                        <div>
                        <button className='font-small-med no-bor bg-white' onClick={() => (setToDo(false), setInProg(false), setComp(true))}>Completed ({compCur && (compCur.length)})</button>
                        {comp && <div className='gray-line-med'></div> }

                        </div>


                    </div>
                    <div className='long-gray-line t-margin-05'></div>

                    {toDo && (
                         <div className='scroller-profile'>
                         {toDoCur && curTasks.length > 0 && (toDoCur.map(task => {
                        return ( <div>
                            <Link to={`/projects/${task.projectId}`} className='no-und cursor'>
                            <div className='row width-100-per ai-c t-margin-05'>
                             <i className="fa-regular fa-circle-check lr-margin-small"></i>
                             <div className='min-width-40vw font-med should-wrap'>{task.name}</div>
                            </div>
                            </Link>
                            </div>
                        )}))}</div>)}

                    {inProg && (
                         <div className='scroller-profile'>
                         {inProgCur && curTasks.length > 0 && (inProgCur.map(task => {
                        return ( <div>
                            <Link to={`/projects/${task.projectId}`} className='no-und cursor'>
                            <div className='row width-100-per ai-c t-margin-05'>
                             <i className="fa-regular fa-circle-check lr-margin-small"></i>
                             <div className='min-width-40vw font-med should-wrap'>{task.name}</div>
                            </div>
                            </Link>
                            </div>
                        )}))}</div>)}

                    {comp && (
                         <div className='scroller-profile'>
                         {compCur && curTasks.length > 0 && (compCur.map(task => {
                        return ( <div>
                            <Link to={`/projects/${task.projectId}`} className='no-und cursor'>
                            <div className='row width-100-per ai-c t-margin-05'>
                             <i className="fa-regular fa-circle-check lr-margin-small"></i>
                             <div className='min-width-40vw font-med should-wrap'>{task.name}</div>
                            </div>
                            </Link>
                            </div>
                        )}))}</div>)}










                </div>
                <div className='profile-box'>

                    <div className='col ai-st width-members tb-margin lr-margin-small'>
                        <div className='b-margin'>Projects</div>

                        {user &&
                      <div className='ai-st row flex-wrap scroller-profile-projects'>
                        {!allMyProjects && (<div>This team does not yet have any projects</div>)}

            {allMyProjects && allMyProjects.map(project => {
                      return (
                        <div className='profile-project '>
                        {/* width-30-per overflow-hidden lr-margin-med height-10-per */}
                        <Link key={project.id} to={`/projects/${project.id}`} className='no-und'>
                        <div className='row '>
                            <div className='row'>
                                <div className='jc-st ai-c'>
                                    <div className='box-circle-mem-no-margin ai-c jc-c'>
                                    <div className='solid-round-sq jc-c ai-c' style={{backgroundColor: arrayOfColors[project.id]}}><i className="fa-solid fa-list-ul"></i></div>
                                    </div>


                                </div>


                                <div className='jc-c ai-c lr-margin-small'>{project.name} </div>


                            </div>

                        </div>

                            </Link>
                            </div>)})}
                      </div>
                      }



                        </div>
                    </div>
            </div>

            {/* use the same logic as projects */}

            <div className='row'>
                <div className='profile-box'>


                    <div className='col ai-st width-members tb-margin lr-margin-small'>
                            <div>Team Owner</div>


                            <div  className='col ai-st tb-margin scroller-profile'>



                                            <div >
                                            <button onClick={() => setShowTModal(true)} className='no-bor bg-white jc-st ai-c cursor pad-0'>
                                                    <div className='row ai-c tb-margin jc-sb width-vw'>
                                                        <div className='row'>

                                                        <div className='box-circle-mem-no-margin all-margin-tb-x-small'>
                                                        <div className='dotted-round-sq jc-c ai-c font-small-med pad-02'><i className="fa-solid fa-plus"></i></div>
                                                        </div>
                                                        <div className='ai-c lr-margin-small font-med'> Create Team</div>

                                                        </div>

                                                    </div>
                                            </button>
                                            <CreateTeamModal showTModal={showTModal} setShowTModal={setShowTModal}/>
                                                    <div className='long-gray-line'></div>

                                            </div>


                                        {ownersTeams && ownersTeams.map(team => {
                                    return (


                                            <div >
                                                <Link key={team.id} to={`/teams/${team.id}`} className='no-und'>
                                                    <div className='row ai-c tb-margin jc-sb width-vw'>
                                                        <div className='row'>
                                                            <div className='box-circle-mem-no-margin'>
                                                            <div className='solid-round-sq jc-c ai-c' style={{backgroundColor: arrayOfColors[team.id]}}><i className="fa-solid fa-list-ul"></i></div>
                                                            </div>

                                                            <div className='ai-c lr-margin-small'> {team.name} </div>
                                                        </div>

                                                    </div>
                                                    <div className='long-gray-line'></div>
                                                </Link>
                                            </div>
                                            )})}
                             </div>

                    </div>



                </div>
                <div className='profile-box'>
                <div className='col ai-st width-members tb-margin lr-margin-small'>
                            <div>Team Member</div>
                            <div  className='col ai-st tb-margin scroller-profile'>
                                        {curUsersTeams && curUsersTeams.map(team => {
                                    return (
                                        <div >
                                            <div className='row width-vw jc-sb'>
                                            <Link key={team.id} to={`/teams/${team.id}`} className='no-und'>
                                            <div className='row ai-c tb-margin jc-sb'>
                                                <div className='row'>
                                                    <div className='box-circle-mem-no-margin ai-c'>
                                                    <div className='solid-round-sq jc-c ai-c' style={{backgroundColor: arrayOfColors[team.id]}}><i className="fa-solid fa-list-ul"></i></div>

                                                    </div>

                                                    <div className='ai-c lr-margin-small'>{team.name} </div>
                                                </div>
                                            </div>

                                            </Link>
                                            <button onClick={() => handleRemoveMembership(team.id)} className='no-bor bg-white jc-st ai-c cursor pad-0'>
                                            <div className='dotted-round-sq jc-c ai-c font-small-med pad-02'>
                                            <i className="fa-solid fa-person-walking-arrow-right"></i>
                                                </div>
                                                <div className='font-med'>&nbsp; Leave Team</div>
                                            </button>

                                            </div>

                                            <div className='long-gray-line'></div>
                                            </div>)})}
                             </div>

                    </div>

                </div>
            </div>



        </div>

    )

}


export default ProfilePage

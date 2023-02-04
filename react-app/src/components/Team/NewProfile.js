
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams, fetchOneTeam } from '../../store/team'
import { authenticate } from '../../store/session';
import CreateProjectModal from '../Projects/CreateProjectModal';
import { fetchCreateMembership } from '../../store/membership';
import EditTeamModal from './EditTeamModal';
import arrayOfColors from '../../assets/ArrayOfColors';


const NewProfile = () => {
   

    const [ toDo, setToDo] = useState(true)
    const [ inProg, setInProg] = useState(false)
    const [ comp, setComp] = useState(false)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false); //for projects
    const [showTModal, setShowTModal] = useState(false); //for teams
    const [sentTeamId, setSentTeamId] = useState(0)

    return (
        <div className="col lr-margin jc-c ai-c">
            <div>Friday, February 3</div>
            <h1>Welcome, Annika</h1>
            <div className='row'>
                <div className='profile-box'>

                    <div className='row ai-c width-members tb-margin lr-margin-small'>
                        <div className='solid-circle jc-c ai-c font-small-med pad-04'
                        style={{backgroundColor: arrayOfColors[0]}}>An</div>
                        <div>&nbsp;My Tasks</div>
                    </div>

                    <div className='row jc-sa lr-margin-small'>
                        <button className='font-small-med' onClick={() => (setToDo(true), setInProg(false), setComp(false))}>To Do</button>
                        <button className='font-small-med' onClick={() => (setToDo(false), setInProg(true), setComp(false))}>In Progress</button>
                        <button className='font-small-med' onClick={() => (setToDo(false), setInProg(false), setComp(true))}>Completed</button>
                    </div>
                    <div className='long-gray-line t-margin-05'></div>

                    {toDo && (
                         <div className='scroller-profile'>
                         <div className='row width-100-per ai-c t-margin-05 bg-green'>
                             <i className="fa-regular fa-circle-check lr-margin-small"></i>
                             <div className='min-width-40vw font-small-med should-wrap'>Task with link to project Task with link to project</div>
                         </div>
                     </div>
                    )}

                    {inProg && (
                         <div className='scroller-profile'>
                         <div className='row width-100-per ai-c t-margin-05 bg-blue'>
                             <i className="fa-regular fa-circle-check lr-margin-small"></i>
                             <div className='min-width-40vw font-small-med should-wrap'>2Task with link to project Task with link to project</div>
                         </div>
                     </div>
                    )}

                    {comp && (
                         <div className='scroller-profile'>
                         <div className='row width-100-per ai-c t-margin-05 bg-red'>
                             <i className="fa-regular fa-circle-check lr-margin-small"></i>
                             <div className='min-width-40vw font-small-med should-wrap'>Task with link to project Task with link to project</div>
                         </div>
                     </div>
                    )}








                </div>
                <div className='profile-box'>

                    <div className='col ai-st width-members tb-margin lr-margin-small'>
                        <div>Projects</div>

                    {/* {user && */}
                      <div className='ai-c'>
                        {/* {oneTeamObj.memberships.find(member => member.users[0].id == user.id) && */}
                        <div  className='row ai-c tb-margin'>
                           <button onClick={() => setShowModal(true)} className='no-bor bg-white jc-st ai-c cursor pad-0'>
                            <div className='dotted-round-sq jc-c ai-c font-small-med pad-02'>
                                <i className="fa-solid fa-plus"></i>
                                </div>
                                <div className='font-med'>&nbsp; New Project</div>
                            </button>
                        {/* <CreateProjectModal showModal={showModal} setShowModal={setShowModal}/> */}
                        </div>
                        {/* } */}
                      </div>
                      {/* } */}

                        </div>
                    </div>
            </div>

            <div className='row'>
                <div className='profile-box'>
                    <div className='col ai-st width-members tb-margin lr-margin-small'>
                            <div>Team Owner</div>
                        <div className='ai-c'>
                            <div  className='row ai-c tb-margin'>
                            <button onClick={() => setShowModal(true)} className='no-bor bg-white jc-st ai-c cursor pad-0'>
                                <div className='dotted-round-sq jc-c ai-c font-small-med pad-02'>
                                    <i className="fa-solid fa-plus"></i>
                                    </div>
                                    <div className='font-med'>&nbsp; New Team</div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='profile-box'>
                <div className='col ai-st width-members tb-margin lr-margin-small'>
                            <div>Team Member</div>
                        <div className='ai-c'>
                            <div  className='row ai-c tb-margin'>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </div>

    )

}


export default NewProfile

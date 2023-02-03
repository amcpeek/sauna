import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams } from '../../store/team'
import { authenticate } from '../../store/session';
import CreateTeamModal from './CreateTeamModal';
import { fetchCreateMembership } from '../../store/membership';


const ViewAllTeams = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showTModal, setShowTModal] = useState(false);

    const findProjectTest = async () => {
        const returnTeams = await dispatch(fetchAllTeams())
        const returnUser = await dispatch(authenticate())
    }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

    let user = useSelector(state => {return state.session.user})
    let allTeamsObj = useSelector(state => {return state.team})
    let allTeams = Object.values(allTeamsObj)

    const handleCreateMembership = async (teamId) => {
        await dispatch(fetchCreateMembership(teamId))
          .then(history.push(`/profile`)) //this isn't working at all
          .catch(async (err) => {
            console.log('5555555555', err)
          })
     }


    return (
        <div className='main-left col main-left lr-margin'>


            <div className='col main-left-proj'>
                <h1>All Teams</h1>
                {allTeams && (allTeams.map(team => {
                    return (
                        <div>
                        <Link key={team.id} to={`/teams/${team.id}`} className='no-und'>




                        <h3 className='text-blue should-wrap-70'>
                        {/* <i className="fa-solid fa-user-plus"></i> */}
                        {team.name}</h3>
                        <div className='col'>

                        <h5 className='should-wrap-70'>Team Lead: {team.owner.username}
                        <br/>
                        {team.description}</h5>
                        </div>
                        </Link>

                        {/* <button onClick={() => handleCreateMembership(team.id)}>Join Team</button> */}

                        <div className='short-gray-line tb-margin'></div>
                        </div>
                        )


                    }))
                    }
            </div>
            {user &&
                      <div className='ai-st  col'>
                        <button onClick={() => setShowTModal(true)} className='just-text-button bg-white cursor text-blue font-large'>Create New Team</button>
                        <CreateTeamModal showTModal={showTModal} setShowTModal={setShowTModal}/>
                        {/* <Link className='no-und' to='/profile'>View Your Teams</Link> */}
                        {/* <div className='short-gray-line tb-margin'></div> */}
                      </div>
                      }
        </div>
    )

}

export default ViewAllTeams

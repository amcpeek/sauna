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
    const [showModal, setShowModal] = useState(false);

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
          .then(history.push(`/teams`))
          .catch(async (err) => {
            alert(err)
            console.log('5555555555', err)
          })
     }


    return (
        <div className='main-left col main-left lr-margin'>
              {user &&
                      <div className='ai-st  col'>
                        <button onClick={() => setShowModal(true)} className='just-text-button bg-white cursor'>Create New Team</button>
                        <CreateTeamModal showModal={showModal} setShowModal={setShowModal}/>
                        <Link className='no-und' to='/profile'>View Your Teams</Link>
                        <div className='short-gray-line tb-margin'></div>
                      </div>
                      }

            <div className='col main-left-proj'>
                <div>View All Teams</div>
                {allTeams && (allTeams.map(team => {
                    return (
                        <Link key={team.id} to={`/teams/${team.id}`} className='no-und'>
                        <div>



                        <h3 className='text-blue'> <i className="fa-solid fa-user-plus"></i> {team.name}:</h3>
                        <div className='col'>

                        <h5>Team Lead: {team.owner.username}
                        <br/>
                        {team.description}</h5>
                        <button onClick={() => handleCreateMembership(team.id)}>Join Team</button>
                        <br/>
                        <div className='short-gray-line'></div>

                        </div>

                        <br/>

                        </div>
                        </Link>
                        )


                    }))
                    }
            </div>
        </div>
    )

}

export default ViewAllTeams

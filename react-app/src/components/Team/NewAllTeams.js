import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams } from '../../store/team'
import { authenticate } from '../../store/session';
import CreateTeamModal from './CreateTeamModal';
import { fetchCreateMembership } from '../../store/membership';


const NewAllTeams = () => {
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
            //console.log('5555555555', err)
          })
     }
    return (
        <div>
            <div>All Teams</div>
            <div>
                <div className='teamHeader'>
                    <div>
                        Team Name
                    </div>
                    <div>
                        Owner
                    </div>
                    <div>
                        Members
                    </div>
                </div>
                <div className='teamBody'>

                    <div className='team1'>
                        <div>
                            Team1 name
                        </div>
                        <div>
                            Owner 1
                        </div>
                        <div>
                            Members 1234
                        </div>
                    </div>
                    <div className='team2'>
                        <div>
                            Team2 name
                        </div>
                        <div>
                            Owner 4
                        </div>
                        <div>
                            Members 5678
                        </div>
                    </div>
                    <div className='newTeam'>
                        <div>
                            new Team button
                        </div>
                        <div>
                            X
                        </div>
                        <div>
                            X
                        </div>
                    </div>

                </div>




            </div>

        </div>

    )
}


export default NewAllTeams

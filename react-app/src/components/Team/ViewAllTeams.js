import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAllTeams } from '../../store/team'


const ViewAllTeams = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const findProjectTest = async () => {
        const returnTeams = await dispatch(fetchAllTeams())
    }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

    let allTeamsObj = useSelector(state => {return state.team})
    let allTeams = Object.values(allTeamsObj)

    return (
        <div className='main-left col main-left lr-margin'>
            <div className='col main-left-proj'>
                {allTeams && (allTeams.map(team => {
                    return (
                        <Link key={team.id} to={`/teams/${team.id}`} className='no-und'>
                        <div>

                            <div className='short-gray-line'></div>

                        <h3 className='text-blue'> <i className="fa-solid fa-user-plus"></i> {team.name}:</h3>
                        <div className='col'>

                        <h5>Team Lead: {team.owner.username} <br/> {team.description}</h5>

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

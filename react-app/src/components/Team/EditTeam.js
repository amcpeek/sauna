import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import TeamForm from "./TeamForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneTeam } from "../../store/team";


const EditTeam=({showTModal, setShowTModal, sentTeamId})=>{
   // console.log('are we getting to EditTeam.js', sentTeamId)
    const dispatch = useDispatch()
    // const {id}=useParams();
    const findTeamTest = async () => {
        const returnTeam = await dispatch(fetchOneTeam(sentTeamId))
    }


    useEffect(() => {
       findTeamTest()
    }, [dispatch])

    const tempTeam = useSelector(state=>state.team[sentTeamId])
   // console.log('s tempTeam working', tempTeam)

    if(!tempTeam) return null

    const team={
        id:tempTeam.id,
        ownerId:tempTeam.ownerId,
        name:tempTeam.name,
        description:tempTeam.description
    }

    return (
        <TeamForm team={team} formType="Edit Team" showTModal={showTModal} setShowTModal={setShowTModal}/>

    )
}

export default EditTeam

import React from "react";
import { fetchCreateTeam } from "../../store/team";
import TeamForm from "./TeamForm";


const CreateTeam=({showModal, setShowModal})=>{

    const team={
        name:"",
        description:"",
    }

    return (
        <div>
        <TeamForm team={team} formType="Create Team" showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}

export default CreateTeam

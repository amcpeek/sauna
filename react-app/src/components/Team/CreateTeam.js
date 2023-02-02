import React from "react";
import { fetchCreateTeam } from "../../store/team";
import TeamForm from "./TeamForm";


const CreateTeam=({showTModal, setShowTModal})=>{

    const team={
        name:"",
        description:"",
    }

    return (
        <div>
        <TeamForm team={team} formType="Create Team" showTModal={showTModal} setShowTModal={setShowTModal}/>
        </div>
    )
}

export default CreateTeam

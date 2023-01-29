import React from "react";
import { fetchCreateProject } from "../../../store/project";
import ProjectForm from "../ProjectForm";


const CreateProject=({showModal, setShowModal})=>{

    const project={
        name:"",
        description:"",
    }

    return (
        <div>
        <ProjectForm project={project} formType="Create Project" showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}

export default CreateProject

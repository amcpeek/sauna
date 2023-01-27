import React from "react";
import { fetchCreateProject } from "../../../store/project";
import ProjectForm from "../ProjectForm";


const CreateProject=({showModal, setShowModal})=>{

    const project={
        name:"",
        description:"",
    }

    return (
        <div> does the create project page show too
        <ProjectForm project={project} formType="Create Project"/>
        </div>
    )
}

export default CreateProject

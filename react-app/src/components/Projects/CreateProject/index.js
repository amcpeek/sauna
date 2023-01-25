import React from "react";
import { fetchCreateProject } from "../../../store/project";
import ProjectForm from "../ProjectForm";


const CreateProject=()=>{

    const project={
        name:"",
        description:"",
    }

    return (
        <ProjectForm project={project} formType="Create Project"/>
    )
}

export default CreateProject

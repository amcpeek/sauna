import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ProjectForm from "../ProjectForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneProject } from "../../../store/project";


const EditProject=({showModal, setShowModal})=>{
    const dispatch = useDispatch()
    const {id}=useParams();
    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(id))
    }

    useEffect(() => {
       findProjectTest()
    }, [dispatch])

    const tempProject = useSelector(state=>state.project[id])

    if(!tempProject) return null

    const project={
        id:tempProject.id,
        ownerId:tempProject.ownerId,
        name:tempProject.name,
        description:tempProject.description
    }

    return (
        <ProjectForm project={project} formType="Edit Project" showModal={showModal} setShowModal={setShowModal}/>

    )
}

export default EditProject


import React, { useEffect, useState } from 'react'
import { fetchCreateTask } from "../../../store/task";
import { fetchAllProjects } from "../../../store/project";
import { fetchOneTask } from '../../../store/task';
import TaskForm from "../TaskForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EditTask=({selectedTask, showTask, setShowTask})=>{
    //console.log('In EditTask, selectedTask', selectedTask.id)

     const {projectId}=useParams()
    const dispatch = useDispatch()

    const findProjectTest = async () => {
        const allProjects = await dispatch(fetchAllProjects())
        const oneTask = await dispatch(fetchOneTask(selectedTask.id))
      }

    useEffect(() => {
        findProjectTest()
     }, [dispatch, selectedTask])



    const tempTask = useSelector(state=>state.task[selectedTask.id])

    if(tempTask) {
       // console.log('can we get tempTask? tempTask.projectId', tempTask.projectId)
        const task={
            id:tempTask.id,
            name:tempTask.name,
            description:tempTask.description,
            stageId:tempTask.stageId
        }
      //  console.log('is task correct', task)
        return (
            <TaskForm task={task} formType="Edit Task" projectId={tempTask.projectId} showTask={showTask} setShowTask={setShowTask}/>
        )
    } else {
        return (
            <div>The feature has not available because you are not logged in
            </div>

        )


    }
}

export default EditTask

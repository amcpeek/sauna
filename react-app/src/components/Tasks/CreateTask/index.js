import { fetchCreateReward } from "../../../store/task";
import { fetchOneProject } from '../../../store/project';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react'
import TaskForm from "../TaskForm";
import { useParams } from "react-router-dom";

const CreateTask=()=>{

    const {id}=useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => {return state.session.user})
    const allProjects = useSelector(state => {return state.project})
    // console.log(user)
    // console.log(allProjects)
    console.log('what is projectId in the create  task', id)


    const findProjectTest = async () => {
        const allProjects = await dispatch(fetchOneProject(id))
      }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

     const task={
        name:'',
        description:"",
        stageId:1
    }


    if (allProjects && user) {
        console.log('user', user, "allProjects", allProjects)
        console.log('are we getting to the create page?')

                return (
                    <TaskForm task={task} formType="Create Task" projectId={id}/>
                )
            // }



    }
    return (<div>This feature is not available because you are not logged in
    </div>)

}
export default CreateTask

import { fetchCreateReward } from "../../store/task";
import { fetchOneProject } from '../../store/project';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react'
import TaskForm from "./TaskForm";
import { useParams } from "react-router-dom";

const CreateTask=({setShowAddTask1, setShowAddTask2, setShowAddTask3, showAddTask1, showAddTask2, showAddTask3 })=>{

    const {id}=useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => {return state.session.user})
    const allProjects = useSelector(state => {return state.project})


    const newToday = new Date()
    const todayFormatted =  (new Intl.DateTimeFormat('default', { dateStyle: 'full' }).format(newToday))
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        timeZone: 'America/Los_Angeles'
      };
    const fullDay = (new Intl.DateTimeFormat('default', options).format(newToday))
    let arrayDay = fullDay.split('/')
    if (arrayDay[1].length == 1) {  arrayDay[1] = `0${arrayDay[1]}` }
    if (arrayDay[0].length == 1) { arrayDay[0] = `0${arrayDay[0]}` }
    let htmlDay = `${arrayDay[2]}-${arrayDay[0]}-${arrayDay[1]}`
    let today = htmlDay




    const findProjectTest = async () => {
        const allProjects = await dispatch(fetchOneProject(id))
      }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

     const task={
        name:'',
        description:"",
        stageId:1,
        dueDate:today
    }


    if (allProjects && user) {
       // console.log('user', user, "allProjects", allProjects)
      // console.log('are we getting to the create page?')

                return (
                    <TaskForm task={task} formType="Create Task" projectId={id}
                    setShowAddTask1={setShowAddTask1}
                    setShowAddTask2={setShowAddTask2}
                    setShowAddTask3={setShowAddTask3}
                    showAddTask1={showAddTask1}
                    showAddTask2={showAddTask2}
                    showAddTask3={showAddTask3}
                    />
                )
            // }



    }
    return (<div>This feature is not available because you are not logged in
    </div>)

}
export default CreateTask

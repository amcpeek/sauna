import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateTask,fetchUpdateTask,fetchDeleteTask } from "../../store/task";
import { fetchOneProject } from "../../store/project"
import { authenticate } from '../../store/session';
import { fetchOneTeam } from '../../store/team'

const TaskForm=({task, formType, projectId,
    setShowAddTask1, setShowAddTask2, setShowAddTask3, showAddTask1, showAddTask2, showAddTask3,
    showTask, setShowTask
    }) => {
    let initName, initDescription, initStageId, initAssigneeId, initDueDate
    let memberArray = []
    let isMember = ''
    const history=useHistory()
    const { id } = useParams()
    const dispatch = useDispatch()
    let user = useSelector(state => {return state.session.user})

    if(task) {
        console.log('for edit what is task.dueDate', task.dueDate, task.id)
    }





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


    let tryToday = new Date(htmlDay)
    console.log('tryToday', tryToday)

    console.log('hihihihihi', new Intl.DateTimeFormat('en-US', {  month: 'short', day: 'numeric' }).format(tryToday));










    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(projectId))
        const returnUser = await dispatch(authenticate())
        const returnTeam = await dispatch(fetchOneTeam(oneProject.teamId))
      }

      useEffect(() => {
        findProjectTest()
     }, [dispatch])

     console.log('TASK', task)
    //const oneProject = useSelector(state => {return state.projects[projectId]})
    if(formType==="Edit Task"){
        initDescription=task.description;
        initName=task.name
        initStageId=task.stageId
        initAssigneeId=task.assigneeId
        initDueDate=task.dueDate
       // console.log('initAssigneeId', initAssigneeId)
    } else {
        initDescription=''
        initName=''
        initDueDate=today
        if(user) {
            initAssigneeId=user.id
        }

        if(showAddTask1) {
            initStageId=1
        } else if (showAddTask2) {
            initStageId=2
        } else if (showAddTask3) {
            initStageId=3
        }

    }

    const [description, setDescription] = useState(initDescription)
    const [name, setName] = useState(initName)
    const [stageId, setStageId] = useState(initStageId)
    const [validationErrors, setValidationErrors] = useState([])
    const [assigneeId, setAssigneeId] = useState(initAssigneeId)
    const [dueDate, setDueDate] = useState(initDueDate)


    let oneProject = useSelector(state => {return state.project[projectId]})

    let oneTeam = useSelector(state => {
        let projId = state.project[id]
        let tId = 0

        if(projId) {

            tId = state.team[projId.teamId]
           // console.log('8898789878987', projId.teamId, 'teamId', tId)
        }
        return tId
        } )


    useEffect(() => {
        setDescription(initDescription)
        setName(initName)
        setStageId(initStageId)
        setAssigneeId(initAssigneeId)
        setDueDate(initDueDate)
    }, [task])

    useEffect(() => {
        const errors =[];
        if(name.length<=0 || name == ' '){errors.push("Title required");}
        else if(name.length>=60){errors.push("Title must be less than 60 characters")}
        if(description.length>=500){errors.push("Description must be less than 500 characters")}
        // if(assigneeId  not in list of current members)
        //due dates need to be able to be in the past so you can miss them
        setValidationErrors(errors);
    }, [name, description, stageId, assigneeId])


    if(oneTeam && oneTeam.memberships) {
        // console.log('ONE   TEAM',oneTeam.memberships)
        memberArray = oneTeam.memberships
        isMember = memberArray.find(member =>  member.users[0].id == user.id)
        if(isMember) {
            //console.log('isMember', isMember.id)
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const tempTask = { ...task, name, description, stageId, assigneeId, dueDate};
        const errors=[]

        if(formType==="Create Task"){
            //another way
            // console.log('fetch, project', tempReward, projectId)
            // dispatch(fetchCreateTask(tempTask, projectId))
            // .then(()=>{history.push(`/projects/${projectId}`)})
            // .catch(async (err)=>{
            //   const errObj=await err.json();
            //   errors.push(errObj.message)
            //   setValidationErrors(errors)
            // });
            const response = await dispatch(fetchCreateTask(tempTask, projectId))

            if(response.errors) {
                setValidationErrors(Object.values(response.errors))
            } else{
              //  console.log('in the else statement', setShowAddTask1)

                if(showAddTask1) {
                    setShowAddTask1(false)
                } else if (showAddTask2) {
                    setShowAddTask2(false)
                } else if (showAddTask3) {
                    setShowAddTask3(false)
                } else if (showTask) {
                    setShowTask(false)
                }
            }
            }
        else if(formType==="Edit Task"){
                const response = await dispatch(fetchUpdateTask(tempTask))
                if(response.errors) {
                    setValidationErrors(Object.values(response.errors))
                } else{
                    if(showTask) {
                        setShowTask(false)
                    }
                }
            }
    }

    const deleteEvents= (task)=>{
        task.projectId = projectId
        const errors=[]
        dispatch(fetchDeleteTask(task))
        .then(() => setShowTask(false))
        .catch(async (err)=>{
            //console.log('is it reaching the catch block')
          const errObj=await err.json();
          errors.push(errObj.errors)
         // console.log('what is it', errors)
          setValidationErrors(errors)

        });
        }

    const closeBox= () => {
        if(showAddTask1) {
            setShowAddTask1(false)
        } else if (showAddTask2) {
            setShowAddTask2(false)
        } else if (showAddTask3) {
            setShowAddTask3(false)
        } else if (showTask) {
            setShowTask(false)
        }
    }

    if(!isMember) {
        return (
            <div className='jc-c width-100-per'>Only team Members can edit tasks</div>
        )
    }


    return (
        <div className="jc-st col ai-st bg-white width-100-per all-margin-small">
        <div className="">
        </div>
        <div className=''><h2>{formType}</h2></div>
        <form className=' jc-st col ai-st width-100-per' onSubmit={handleSubmit}>
            <button className='just-text-button bg-white b-margin' onClick={()=>closeBox()}>X</button>
{/* // */}
            <div className='width-100-per b-margin'>
                <input
                className='round-sq-05 thin-bor width-100-per'
                placeholder='Your task'
                type="text"
                name="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}/>
            </div>
{/* // */}
{formType==="Edit Task" &&(
    <div className="jc-sf col width-100-per">
            <div className='jc-sf col b-margin'>
                <textarea
                className='width-100-per round-sq-05 thin-bor'
                placeholder='Your Description'
                type="text"
                name="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                ></textarea>
            </div>
{/* // */}
            <div className='jc-sf col width-100-per b-margin'>
            <select
                type='number'
                onChange={(e) => setStageId(e.target.value) }
                value={stageId}
                >
                <option value={1} >To Do</option>
                <option value={2} >In Progress</option>
                <option value={3} >Complete</option>
            </select>
            </div>
 {/* // */}
            <div className='jc-sf col width-100-per b-margin'>
                 <select
                 type='number'
                 onChange={(e) => setAssigneeId(e.target.value) }
                 value={assigneeId}
                 >
                    {memberArray && memberArray.length && memberArray.map(member => {return (
                        <option value={member.userId}>{member.users[0].username}</option>
                    )})}
             </select>


            </div>
 {/* // */}
            <div className='jc-sf col width-100-per b-margin'>

            <div className='col'>
             {/* <label>
             Due date
             </label> */}
             <input
              className='input'
              placeholder='Due Date'
              type="date"
              name="dueDate"
              min={today}
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}/></div>
            </div>
      </div>
)}

{/* // */}

            <div className=''>
            <div className=''>
            {/* <h4>Validation Checking List</h4> */}
            </div>
            {!!validationErrors.length && (
            <div className=''>
            <div className='b-margin'>
             {validationErrors.map((error) => (
            <div key={error} className="">{error}</div>
                       ))}
            </div>
            </div>
             )}
            </div>
{/* // */}
            <div className="">
             <input type="submit" value={formType} className="asana-button b-margin" disabled={!!validationErrors.length}/>
             </div>
            </form>
            {formType==="Edit Task" && user && oneProject && user.id == oneProject.ownerId && (
                <div className="">
              <button onClick={()=>deleteEvents(task)} className="asana-button">Delete</button>
              </div>
                )}
                {formType==="Edit Task" && user && oneProject && (user.id != oneProject.ownerId) && (
                <div className="">*Only the project owner can delete tasks

              </div>

                )}



        </div>
        // </div>

    )






}

export default TaskForm

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateTask,fetchUpdateTask,fetchDeleteTask } from "../../store/task";
import { fetchOneProject } from "../../store/project"
import { authenticate } from '../../store/session';
import { fetchOneTeam } from '../../store/team'

const TaskForm=({task, formType, projectId,
    setShowAddTask1, setShowAddTask2, setShowAddTask3, showAddTask1, showAddTask2, showAddTask3,
    showTask, setShowTask
    }) => {
    let initName, initDescription, initStageId, initAssigneeId
    let memberArray = []
    const history=useHistory()
    const dispatch = useDispatch()

    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(projectId))
        const returnUser = await dispatch(authenticate())
        const returnTeam = await dispatch(fetchOneTeam(oneProject.teamId))
      }

      useEffect(() => {
        findProjectTest()
     }, [dispatch])

    // const oneProject = useSelector(state => {return state.projects[projectId]})
    if(formType==="Edit Task"){
        initDescription=task.description;
        initName=task.name
        initStageId=task.stageId
        initAssigneeId=task.assigneeId
        console.log('initAssigneeId', initAssigneeId)
    } else {
        initDescription=''
        initName=''
        initAssigneeId=0
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

    let user = useSelector(state => {return state.session.user})
    let oneProject = useSelector(state => {return state.project[projectId]})
    let oneTeam = useSelector(state => {return state.team[oneProject.teamId]} )

    useEffect(() => {
        setDescription(initDescription)
        setName(initName)
        setStageId(initStageId)
        setAssigneeId(initAssigneeId)
    }, [task])

    useEffect(() => {
        const errors =[];
        if(name.length<=0 || name == ' '){errors.push("Title required");}
        else if(name.length>=60){errors.push("Title must be less than 60 characters")}
        if(description.length>=500){errors.push("Description must be less than 500 characters")}
        // if(assigneeId  not in list of current members)
        setValidationErrors(errors);
    }, [name, description, stageId, assigneeId])


    if(oneTeam && oneTeam.memberships) {
        // console.log('ONE   TEAM',oneTeam.memberships)
        memberArray = oneTeam.memberships
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const tempTask = { ...task, name, description, stageId, assigneeId};
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
            console.log('is it reaching the catch block')
          const errObj=await err.json();
          errors.push(errObj.errors)
          console.log('what is it', errors)
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
                {console.log('assigneeId', assigneeId)}

                 <select
                 type='number'
                 onChange={(e) => setAssigneeId(e.target.value) }
                 value={assigneeId}

                 >
                    {memberArray && memberArray.length && memberArray.map(member => {return (
                        <option value={member.id}>{member.users[0].username}</option>
                    )})}
             </select>


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

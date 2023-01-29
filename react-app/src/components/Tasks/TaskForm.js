import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateTask,fetchUpdateTask,fetchDeleteTask } from "../../store/task";
import { fetchOneProject } from "../../store/project"

const TaskForm=({task, formType, projectId,
    setShowAddTask1, setShowAddTask2, setShowAddTask3, showAddTask1, showAddTask2, showAddTask3,
    showTask, setShowTask
    }) => {
    let initName, initDescription, initStageId
    const history=useHistory()
    const dispatch = useDispatch()




    const findProjectTest = async () => {
        const returnProject = await dispatch(fetchOneProject(projectId))
      }

      useEffect(() => {
        findProjectTest()
     }, [dispatch])

    // const oneProject = useSelector(state => {return state.projects[projectId]})
    if(formType==="Edit Task"){
        initDescription=task.description;
        initName=task.name
        initStageId=task.stageId
    } else {
        initDescription=''
        initName=''
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

    //console.log('what is in validation errors array when nothing has been entered', validationErrors, "name", name, 'description', description, 'stageId', stageId)

    useEffect(() => {
       // console.log('when is the task use effect run', "name", name, 'description', description, 'stageId', stageId)
        // if (!name&&!description&&!stageId) {
        //   setValidationErrors([]);
        //   return;
        // }
        const errors =[];
        if(name.length<=0){errors.push("Title required");}
        else if(name.length>=50){errors.push("Title must be less than 50 characters")}
        // if(description.length<=0){errors.push("Description required");}
        if(description.length>=255){errors.push("Description must be less than 255 characters")}
        setValidationErrors(errors);
    }, [name, description, stageId])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const tempTask = { ...task, name, description, stageId};
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
        .then(setShowTask(false))
        .catch(async (err)=>{
          const errObj=await err;
          errors.push(errObj.message)
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
        }
    }


    return (
        <div className="jc-st col ai-st bg-white width-100-per">
        <div className="">
        </div>
        <div className=''><h2>{formType}</h2></div>
        <form className=' jc-st col ai-st width-100-per' onSubmit={handleSubmit}>
            <button className='just-text-button bg-white' onClick={()=>closeBox()}>X</button>
{/* // */}
            <div className='width-100-per'>
                <input
                className='round-sq-05 thin-bor width-100-per'
                placeholder='Your task'
                type="text"
                name="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}/>
            </div>
{/* // */}
{formType==="Edit Task" &&(
    <div className="jc-sf col width-100-per">
            <div className='jc-sf col'>
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
            <div className='jc-sf col width-100-per'>
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
      </div>
)}

{/* // */}

            <div className=''>
            <div className=''>
            {/* <h4>Validation Checking List</h4> */}
            </div>
            {!!validationErrors.length && (
            <div className=''>
            <div className=''>
             {validationErrors.map((error) => (
            <div key={error} className="">{error}</div>
                       ))}
            </div>
            </div>
             )}
            </div>
{/* // */}
            <div className="">
             <input type="submit" value={formType} className=" bg-white round-sq-05 thin-bor" disabled={!!validationErrors.length}/>
             </div>
            </form>
            {formType==="Edit Task" &&(
                <div className="">
              <button onClick={()=>deleteEvents(task)} className="bg-white round-sq-05 thin-bor">Delete</button>
              </div>
                )}




        </div>
        // </div>

    )






}

export default TaskForm

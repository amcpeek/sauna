import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateTask,fetchUpdateTask,fetchDeleteTask } from "../../../store/task";
import { fetchOneProject } from "../../../store/project"

const TaskForm=({task, formType, projectId,
    setShowAddTask1, setShowAddTask2, setShowAddTask3, showAddTask1, showAddTask2, showAddTask3,
    showTask, setShowTask
    }) => {
    let initName, initDescription, initStageId
    const history=useHistory()
    const dispatch = useDispatch()
    //console.log('is tasks getting to the task form for edit?', task)
    //console.log('showAddTask1 in TaskForm',  setShowAddTask1, setShowAddTask2, setShowAddTask3)
    const allStages = ['To Do', 'InProgress', 'Complete']


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

    useEffect(() => {
        if (!name&&!description&&!stageId) {
          setValidationErrors([]);
          return;
        }
        const errors =[];
        if(name.length<=0){errors.push("Name required");}
        else if(name.length>=50){errors.push("name must be less than 50 characters")}
        // if(description.length<=0){errors.push("Description required");}
        if(description.length>=255){errors.push("Description must be less than 255 characters")}
        setValidationErrors(errors);
    }, [name, description, stageId])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const tempTask = { ...task, name, description, stageId};
        const errors=[]

        if(formType==="Create Task"){
            //the working version
            // console.log('fetch, project', tempReward, projectId)
            // dispatch(fetchCreateTask(tempTask, projectId))
            // .then(()=>{history.push(`/projects/${projectId}`)})
            // .catch(async (err)=>{
            //   const errObj=await err.json();
            //   errors.push(errObj.message)
            //   setValidationErrors(errors)
            // });
            //the non working version
            const response = await dispatch(fetchCreateTask(tempTask, projectId))

            if(response.errors) {
                setValidationErrors(Object.values(response.errors))
            } else{
                console.log('in the else statement', setShowAddTask1)
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

                // dispatch(fetchUpdateTask(tempTask))
                // .then(history.push(`/projects/${projectId}`))
                // // .catch(async (err)=>{
                // //   const errObj=await err.json();
                // //   errors.push(errObj.message)
                // //   setValidationErrors(errors)
                // // });
                // .catch((error) => console.log(error))

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
        <div className="reward-form-container">
        <div className="reward-form-title-sec">
        </div>
        <div className='reward-form-title'><h2>{formType}</h2></div>
        <form className='reward-form-form' onSubmit={handleSubmit}>
            <button onClick={()=>closeBox()}>X</button>
{/* // */}
            <div className='reward-form-list-item'>
                <div>
                {/* <label>
                Title
                </label> */}
                <input
                className='input'
                placeholder='Your task'
                type="text"
                name="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}/>
                </div>
            </div>
{/* // */}
{formType==="Edit Task" &&(
    <div>
            <div className='reward-form-list-item'>
                <div>
                {/* <label>
                Description
                </label> */}
                <textarea
                // className='input'
                className='reward-form-textarea'
                placeholder='Your Description'
                type="text"
                name="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}/>
                </div>
            </div>
{/* // */}

      <div className='reward-form-list-item'>
      <div>
          <label>
          Stage
          </label>
                       {/* <select
                        placeholder='Stage'
                        onChange={(e) => setStageId(e.target.value)}
                        <option value='1'>To Do</option>


                        {/* value={allStages[0]}
                        >
                            {allStages.map(stage => (
                                <option key={stage} value={stage}> {stage}</option>
                            ))}
                        </select> */}




          <input
          className='input'
          placeholder='stage'
          type="number"
          name="stage"
          min='1'
          max='3'
          onChange={(e) => setStageId(e.target.value)}
          value={stageId}/>
          </div>
      </div>
      </div>

)}

{/* // */}

            <div className='reward-form-error-sec'>
            <div className='error-title'>
            {/* <h4>Validation Checking List</h4> */}
            </div>
            {!!validationErrors.length && (
            <div className='reward-form-error-table'>
            <div className='reward-form-error'>
             {validationErrors.map((error) => (
            <div key={error} className="reward-form-error-text">{error}</div>
                       ))}
            </div>
            </div>
             )}
            </div>
{/* // */}
            <div className="reward-form-button">
             <input type="submit" value={formType} className="reward-button" disabled={!!validationErrors.length}/>
             </div>
            </form>
            {formType==="Edit Task" &&(
                <div className="projectform-button">
              <button onClick={()=>deleteEvents(task)} className="reward-form-delete-button">Delete Task</button>
              </div>
                )}




        </div>
        // </div>

    )






}

export default TaskForm

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateTask,fetchUpdateTask,fetchDeleteTask } from "../../../store/task";
import { fetchOneProject } from "../../../store/project"

const TaskForm=({task, formType, projectId}) => {
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

    if(formType==="Edit Type"){
        initDescription=task.description;
        initName=task.name
        initStageId=task.stageId
    } else {
        initDescription=''
        initName=''
        initStageId=1
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
        if(name.length<=0){errors.push("Task's name field is required");}
        else if(name.length>=50){errors.push("Task's name must be less than 50 characters")}
        if(description.length<=0){errors.push("Task's description field is required");}
        else if(description.length>=255){errors.push("Task's description must be less than 255 characters")}
        setValidationErrors(errors);
    }, [name, description, stageId])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const tempTask = { ...task, name, description, stageId};
        const errors=[]

        if(formType==="Create Task"){
            // console.log('fetch, project', tempReward, projectId)
            dispatch(fetchCreateTask(tempTask, projectId))
            .then(()=>{history.push(`/projects/${projectId}`)})
            .catch(async (err)=>{
              const errObj=await err.json();
              errors.push(errObj.message)
              setValidationErrors(errors)
            });
            }
        else if(formType==="Edit Task"){
                dispatch(fetchUpdateTask(tempTask))
                .then(history.push(`/projects/${projectId}`))
                .catch(async (err)=>{
                  const errObj=await err.json();
                  errors.push(errObj.message)
                  setValidationErrors(errors)
                });
            }
    }

    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteTask(id))
        .then(history.push(`/projects/${projectId}`))
        .catch(async (err)=>{
          const errObj=await err;
          errors.push(errObj.message)
          setValidationErrors(errors)

        });
        }


    return (
        <div className="reward-form-container">
        <div className="reward-form-title-sec">
        </div>
        <div className='reward-form-title'><h2>{formType}</h2></div>
        <form className='reward-form-form' onSubmit={handleSubmit}>
{/* // */}
            <div className='reward-form-list-item'>
                <div>
                <label>
                Title
                </label>
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
            <div className='reward-form-list-item'>
                <div>
                <label>
                Description
                </label>
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
            <div className='reward-form-error-sec'>
            <div className='error-title'>
            <h4>Validation Checking List</h4>
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
              <button onClick={()=>deleteEvents(task.id)} className="reward-form-delete-button">Delete Task</button>
              </div>
                )}




        </div>
        // </div>

    )






}

export default TaskForm

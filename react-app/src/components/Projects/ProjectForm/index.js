import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateProject,fetchUpdateProject,fetchDeleteProject } from "../../../store/project";

const ProjectForm=({project, formType})=> {
    let initName, initDescription
    const history = useHistory()
    const dispatch = useDispatch()

    if(formType=='Edit Project'){
        initName=project.name
        initDescription=project.description
    } else {
        initName=''
        initDescription=''
    }

    const [name, setName] = useState(initName)
    const [description, setDescription] = useState(initDescription)
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        if(!name&&!description) {
            setValidationErrors([])
            return
        }
        const errors = []
        if(name.length<=0){errors.push("Project name is required")}
        else if(name.length>=50){errors.push("Project name must be less than 50 characters")}
        if(description.length<=0){errors.push("Project description is required")}
        else if(description.length>=255){errors.push("Project description must be less than 255 characters")}
        setValidationErrors(errors);

    }, [name, description])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const tempProject = {...project, name, description}
        const errors = []

        if(formType==='Create Project'){
            dispatch(fetchCreateProject(tempProject))
            .then(()=>history.push('/projects')) //change this later
            .catch(async (err)=> {
                const errObj = await err.json()
                errors.push(errObj.message)
                setValidationErrors(errors)
            })
        }
        else if(formType==='Edit Project') {
            dispatch(fetchUpdateProject(tempProject))
            .then(()=>history.push('/projects')) //this will be easy to change to projects/id, but get it working first
            .catch(async (err)=>{
                const errObj=await err.json();
                errors.push(errObj.message)
                setValidationErrors(errors)

              });
        }
    }
    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteProject(id))
        .then(()=>history.push('/projects'))
        .catch(async (err)=>{
          const errObj=await err.json();
          errors.push(errObj.message)
          setValidationErrors(errors)
        });
        }

        return (
            // <div className="reward-main-container">

              <div className="reward-form-container">
              <div className="reward-form-title-sec">
              {/* <div className='projectform-title1'>{formType}</div> */}
              <div className='reward-form-title2'>Describe your project to your team mates</div>
              </div>
              <div className='reward-form-title'><h2>{formType}</h2></div>
              <form className='reward-form-form' onSubmit={handleSubmit}>
      {/* // */}
                  <div className='reward-form-list-item'>
                      <div className="title-context context">
                    {/* <div className="reward-form-subtitle">Project Name</div> */}
                    {/* <div className="reward-form-subtext">Write a clear, brief name</div> */}
                  </div>
                      <div>
                      <label>
                      Name
                      </label>
                      <input
                      className='input'
                      placeholder='Preparing for launch of our new product'
                      type="text"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}/>
                      </div>
                  </div>
      {/* // */}
                  <div className='reward-form-list-item'>
                  <div className="title-context context">
                    {/* <div className="reward-form-subtitle">Detailed Description</div> */}
                    {/* <div className="reward-form-subtext">Please describe the project in detail.</div> */}
                  </div>
                      <div>
                      <label>
                      Description
                      </label>
                      <textarea
                      // className='input'
                      className='reward-form-textarea'
                      placeholder='Description here'
                      type="text"
                      name="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}/>
                      </div>
                  </div>
      {/* // */}
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
                  {formType==="Edit Project" &&(
                      <div className="projectform-button">
                    <button onClick={()=>deleteEvents(project.id)} className="reward-form-delete-button">Delete Reward</button>
                    </div>
                      )}
              </div>
          )






}


export default ProjectForm

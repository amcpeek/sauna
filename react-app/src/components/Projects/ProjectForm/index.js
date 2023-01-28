import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateProject,fetchUpdateProject,fetchDeleteProject,  fetchOneProject } from "../../../store/project";

const ProjectForm=({project, formType, showModal, setShowModal})=> {
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
            const returnedProject = dispatch(fetchCreateProject(tempProject))
            .then((project) => {
                history.push(`/projects/${project.id}`)
                console.log('returned project', project)
                dispatch( fetchOneProject(project.id)).then(setShowModal(false))
                }) //should redirect to your projects page
            .catch(async (err)=> {
                const errObj = await err.json()
                errors.push(errObj.message)
                setValidationErrors(errors)
            })
        }
        else if(formType==='Edit Project') {
            dispatch(fetchUpdateProject(tempProject))
            //.then(()=>history.push('/projects')) //this will be easy to change to projects/id, but get it working first
            .then((project) => {
                history.push(`/projects/${project.id}`)
                console.log('returned project', project)
                dispatch( fetchOneProject(project.id)).then(setShowModal(false))
                 })
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

              <div className="reward-form-container all-margin-small col">
              <div className="reward-form-title-sec">
              {/* <div className='projectform-title1'>{formType}</div> */}
              {/* <div className='reward-form-title2'></div> */}
              </div>
              {/* <div className='reward-form-title'><h2>{formType}</h2></div> */}
              <form className='reward-form-form' onSubmit={handleSubmit}>
      {/* // */}
                  <div className='reward-form-list-item jc-sf col width-100-per'>


                      <label>
                      Name
                      </label>
                      <input
                      className='input width-38em round-sq-05 thin-bor font-small-med'
                      placeholder='Preparing for launch of our new product'
                      type="text"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}/>

                  </div>
      {/* // */}
                  <div className='reward-form-list-item jc-sf col width-100-per'>

                      <label>
                      Description
                      </label>
                      <textarea
                      // className='input'
                      className='reward-form-textarea width-38em round-sq-05 thin-bor font-small-med'
                      placeholder='Description here'
                      type="text"
                      name="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}/>

                  </div>
      {/* // */}
                  <div className='reward-form-error-sec'>
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
                   <input type="submit" value={formType} className="reward-button bg-white round-sq-05 thin-bor" disabled={!!validationErrors.length}/>
                   </div>
                  </form>
                  {formType==="Edit Project" &&(
                      <div className="projectform-button">
                    <button onClick={()=>deleteEvents(project.id)} className="reward-form-delete-button bg-white round-sq-05 thin-bor">Delete</button>
                    </div>
                      )}
              </div>
          )






}


export default ProjectForm

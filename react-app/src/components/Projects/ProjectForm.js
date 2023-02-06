import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateProject,fetchUpdateProject,fetchDeleteProject,  fetchOneProject } from "../../store/project";

const ProjectForm=({project, formType, showModal, setShowModal})=> {
    const { id } = useParams()
    let initName, initDescription, initTeamId
    const history = useHistory()
    const dispatch = useDispatch()
    //console.log('hhhhh', id)

    if(formType=='Edit Project'){
        initName=project.name
        initDescription=project.description
        initTeamId=project.teamId
    } else {
        initName=''
        initDescription=''
    }

    const [name, setName] = useState(initName)
    const [description, setDescription] = useState(initDescription)
    const [validationErrors, setValidationErrors] = useState([])
    //console.log('validationErrors', validationErrors, validationErrors.length)

    useEffect(() => {
        // if(!name&&!description) {
        //     setValidationErrors([])
        //     return
        // }
        const errors = []
        if(name.length<=0){errors.push("Name required")}
        else if(name.length>=60){errors.push("Name must be less than 60 characters")}
        if(description.length<=0){errors.push("Description required")}
        else if(description.length>=500){errors.push("Description must be less than 500 characters")}
        setValidationErrors(errors);

    }, [name, description])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const tempProject = {...project, name, description}
        const errors = []

        if(formType==='Create Project'){
            tempProject.teamId = id
            const returnedProject = dispatch(fetchCreateProject(tempProject))
            .then((project) => {
                history.push(`/projects/${project.id}`)
               // console.log('returned project', project)
                dispatch( fetchOneProject(project.id)).then(setShowModal(false))
                }) //should redirect to your projects page
            .catch(async (err)=> {
                const errObj = await err.json()
                errors.push(errObj.errors)
                setValidationErrors(errors)
            })
        }
        else if(formType==='Edit Project') {
            tempProject.teamId = project.teamId
            dispatch(fetchUpdateProject(tempProject))
            //.then(()=>history.push('/projects')) //this will be easy to change to projects/id, but get it working first
            .then((project) => {
                history.push(`/projects/${project.id}`)
              // console.log('returned project', project)
                dispatch( fetchOneProject(project.id)).then(setShowModal(false))
                 })
            .catch(async (err)=>{
                const errObj=await err.json();
                //console.log('what is errObj.message', errObj.errors)
                errors.push(errObj.errors)
                setValidationErrors(errors)

              });
        }
    }
    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteProject(id))
        .then(()=>history.push('/profile'))
        .catch(async (err)=>{
          const errObj=await err.json();
          errors.push(errObj.message)
          setValidationErrors(errors)
        });
        }

        return (


              <div className=" all-margin-small col width-20em">
              <div className="">

              </div>

              <form className='' onSubmit={handleSubmit}>
              <button className='just-text-button bg-white b-margin' onClick={()=>setShowModal(false)}>X</button>
      {/* // */}
                  <div className='jc-sf col width-100-per b-margin'>


                      <label>
                      Project Name
                      </label>
                      <input
                      className='width-100-per round-sq-05 thin-bor font-small-med'
                      placeholder='Preparing for launch of our new product...'
                      type="text"
                      name="name"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}/>

                  </div>
      {/* // */}
                  <div className=' jc-sf col width-100-per b-margin'>

                      <label>
                      Description
                      </label>
                      <textarea
                      // className='input'
                      className=' width-100-per round-sq-05 thin-bor font-small-med'
                      placeholder='New product will launch this summer...'
                      type="text"
                      name="Description"
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}/>

                  </div>
      {/* // */}
                  <div className='b-margin'>
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
                   <input type="submit" value={formType} className=" bg-white round-sq-05 thin-bor b-margin" disabled={!!validationErrors.length}/>
                   </div>
                  </form>
                  {formType==="Edit Project" &&(
                      <div className="">
                    <button onClick={()=>deleteEvents(project.id)} className="bg-white round-sq-05 thin-bor">Delete</button>
                    </div>
                      )}
              </div>
          )






}


export default ProjectForm

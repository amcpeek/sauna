import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateTeam,fetchUpdateTeam,fetchDeleteTeam, fetchOneTeam, fetchAllTeams } from "../../store/team";
import { fetchCreateMembership } from '../../store/membership';

const TeamForm=({team, formType, showTModal, setShowTModal})=> {
    let initName, initDescription
    const history = useHistory()
    const dispatch = useDispatch()

    console.log('in Team Form team', team)

    if(formType=='Edit Team'){
        initName=team.name
        initDescription=team.description
    } else {
        initName=''
        initDescription=''
    }

    console.log('initName', initName)

    const [name, setName] = useState(initName)
    const [description, setDescription] = useState(initDescription)
    const [validationErrors, setValidationErrors] = useState([])
    console.log('validationErrors', validationErrors, validationErrors.length)
    console.log('name description', name, description)

    useEffect(() => {
        // if(!name&&!description) {
        //     setValidationErrors([])
        //     return
        // }
        const errors = []
        if(name.length<=0){errors.push("Title required")}
        else if(name.length>=60){errors.push("Title must be less than 60 characters")}
        if(description.length<=0){errors.push("Description required")}
        else if(description.length>=500){errors.push("Description must be less than 500 characters")}
        setValidationErrors(errors);

    }, [name, description])

    const handleCreateMembership = async (teamId) => {
        await dispatch(fetchCreateMembership(teamId))
        .then(dispatch(fetchAllTeams()))
        //   .then(history.push(`/profile`)) //this isn't working at all
          .catch(async (err) => {
           // console.log('5555555555', err)
          })
     }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const tempTeam = {...team, name, description}
        const errors = []

        if(formType==='Create Team'){ //WORKING
            const returnedTeam = dispatch(fetchCreateTeam(tempTeam))
            .then((team) => {
                history.push(`/teams/${team.id}`)
               // console.log('returned team', team)
                dispatch(handleCreateMembership(team.id))
                dispatch( fetchOneTeam(team.id)).then(setShowTModal(false))
                }) //should redirect to your teams page
            .catch(async (err)=> {
                console.log('well what is err', err)
                // const errObj = await err.json()
                // errors.push(errObj.errors)
                // setValidationErrors(errors)
                setValidationErrors(err)
            })
        }
        else if(formType==='Edit Team') { //NOT CLOSING
            dispatch(fetchUpdateTeam(tempTeam))
            //.then(()=>history.push('/teams')) //this will be easy to change to teams/id, but get it working first
            .then((team) => {
                history.push(`/teams/${team.id}`)
              //  console.log('returned team', team)

                dispatch( fetchOneTeam(team.id)).then(setShowTModal(false))
                 })
            .catch(async (err)=>{
                // const errObj=await err.json();
                // console.log('what is errObj.message', errObj.errors)
                // errors.push(errObj.errors)
                // setValidationErrors(errors)
                console.log('well what is err', err)
                setValidationErrors(err)

              });
        }
    }
    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteTeam(id))
        .then(()=>{
            setShowTModal(false)
            //NOT WORKING = ERROR
            history.push('/profile')})
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
              <button className='just-text-button bg-white b-margin' onClick={()=>setShowTModal(false)}>X</button>
              {/* NOT WORKING = ERROR */}
      {/* // */}
                  <div className='jc-sf col width-100-per b-margin'>


                      <label>

                      Team Name
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
                  {formType==="Edit Team" &&(
                      <div className="">
                    <button onClick={()=>deleteEvents(team.id)} className="bg-white round-sq-05 thin-bor">Delete</button>
                    </div>
                      )}
              </div>
          )






}


export default TeamForm

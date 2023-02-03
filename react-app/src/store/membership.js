//action types
const READ_MEMBERSHIPS = 'memberships/READ_MEMBERSHIPS' //m1
const READ_SINGLE_MEMBERSHIP = 'memberships/READ_SINGLE_MEMBERSHIP' //m2
// const READ_BY_USER_ID = 'memberships/READ_BY_USER_ID' //m3 no membership by user
const CREATE_MEMBERSHIP = 'memberships/CREATE_MEMBERSHIP' //m4
const UPDATE_MEMBERSHIP = 'memberships/UPDATE_MEMBERSHIP' //no update
const DELETE_MEMBERSHIP = 'memberships/DELETE_MEMBERSHIP' //m5


//action creators
const getAll = ({Memberships}) => ({
    type: READ_MEMBERSHIPS,
    Memberships
})

const getOne = (membership) => ({
    type: READ_SINGLE_MEMBERSHIP,
    membership
}
)

// const getById = ({Memberships}) => ({
//     type: READ_BY_USER_ID,
//     Memberships
// })

const create = (membership) => ({
    type: CREATE_MEMBERSHIP,
    membership
})

const edit = (membership) => ({
    type: UPDATE_MEMBERSHIP,
    membership
})

const remove = (id) => ({
    type: DELETE_MEMBERSHIP,
    id
})



//thunks
export const fetchAllMemberships = () => async dispatch => {
    const response = await fetch(`/api/memberships`);

    if(response.ok){
        const membershipsList = await response.json()
        // console.log('membershipList', membershipsList)
        dispatch(getAll(membershipsList))
    }
    if(response.status>=400) throw response
}

export const fetchOneMembership = (membershipId) => async dispatch => {
    const response = await fetch(`/api/memberships/${membershipId}`)
    if(response.ok){
        const singleMembership = await response.json()
        dispatch(getOne(singleMembership))
    }
    if(response.status>=400) throw response
}

//exclude fetch by user id

export const fetchCreateMembership = (teamId) => async dispatch => {
    console.log('in Fetch Create Membership', teamId)
    const response = await fetch(`/api/teams/${teamId}/memberships`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    if(response.ok){
        const newMembership = await response.json()
        dispatch(create(newMembership))
        console.log('this is working', newMembership)
        return newMembership
    }
    if(response.status>=400) throw response
}

// export const fetchUpdateMembership = (membership) => async dispatch => {
//     const response = await fetch(`/api/memberships/${membership.id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(membership)
//     })
//     if(response.ok){
//         const editMembership = await response.json()
//         dispatch(edit(editMembership))
//         return editMembership
//     }
//     console.log('in the fetchUpdateMembership what is the response', response)
//     if(response.status>=400) throw response
// }

export const fetchDeleteMembership = (id) => async dispatch => {
    const response = await fetch(`/api/teams/${id}/memberships`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(remove(id))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {}

const membershipsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_MEMBERSHIPS:
            newState={...state}
            action.Memberships.forEach(membership => {
            newState[membership.id] = membership
            })
            return newState

        case READ_SINGLE_MEMBERSHIP:
            newState = {...state}
            newState[action.membership.id] = action.membership
            return newState

        case CREATE_MEMBERSHIP:
            newState = {...state}
            newState[action.membership.id] = action.membership
            return newState

        case UPDATE_MEMBERSHIP:
            newState = {...state}
            newState[action.membership.id] = action.membership
            return newState

        case DELETE_MEMBERSHIP:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state

    }
}

export default membershipsReducer

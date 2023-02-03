//action types
const READ_TEAMS = 'teams/READ_TEAMS' //t1
const READ_SINGLE_TEAM = 'teams/READ_SINGLE_TEAM' //t2
// const READ_BY_USER_ID = 'teams/READ_BY_USER_ID' //t3 bc so view teams, not worth the state shape drama, just filter in component
const CREATE_TEAM = 'teams/CREATE_TEAM' //t4
const UPDATE_TEAM = 'teams/UPDATE_TEAM' //t5
const DELETE_TEAM = 'teams/DELETE_TEAM' //t6

//Tm1 get all
//Tm2 get one
//Tm3 current user
//Tm4 create
//Tm5 edit
//Tm6 delete

//action creators
const getAll = ({Teams}) => ({
    type: READ_TEAMS,
    Teams
})

const getOne = (team) => ({
    type: READ_SINGLE_TEAM,
    team
}
)

// const getByCurrent = ({Teams}) => ({
//     type: READ_BY_USER_ID,
//     Teams
// })

const create = (team) => ({
    type: CREATE_TEAM,
    team
})

const edit = (team) => ({
    type: UPDATE_TEAM,
    team
})

const remove = (id) => ({
    type: DELETE_TEAM,
    id
})



//thunks
export const fetchAllTeams = () => async dispatch => {
    const response = await fetch(`/api/teams`);

    if(response.ok){
        const teamsList = await response.json()
        dispatch(getAll(teamsList))
    }
    if(response.status>=400) throw response
}

export const fetchOneTeam = (teamId) => async dispatch => {
    const response = await fetch(`/api/teams/${teamId}`)
    if(response.ok){
        const singleTeam = await response.json()
        dispatch(getOne(singleTeam))
    }
    if(response.status>=400) throw response
}

//add get by user id fetch later
// export const fetchAllTeamsByCurrentUser = () => async dispatch => {
//     const response = await fetch(`/api/teams/current`)
//     if (response.ok){
//         const teamsList = await response.json()
//         dispatch(getByCurrent(teamsList))
//     }
// }

export const fetchCreateTeam = (team) => async dispatch => {
    const response = await fetch(`/api/teams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    })
    if(response.ok){
        const newTeam = await response.json()
        dispatch(create(newTeam))
       // console.log('this is working', newTeam)
        return newTeam
    }
    if(response.status>=400) throw response
}

export const fetchUpdateTeam = (team) => async dispatch => {
    const response = await fetch(`/api/teams/${team.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    })
    if(response.ok){
        const editTeam = await response.json()
        dispatch(edit(editTeam))
        return editTeam
    }
    //console.log('in the fetchUpdateTeam what is the response', response)
    if(response.status>=400) throw response
}

export const fetchDeleteTeam = (id) => async dispatch => {
    const response = await fetch(`/api/teams/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(remove(id))
        return response
    }
    if(response.status>=400) throw response
}

//will need to change shape to include get by user id
//reducer
const initialState = {}

const teamsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_TEAMS:
            newState={...state}
            action.Teams.forEach(team => {
            newState[team.id] = team
            })
            return newState

        case READ_SINGLE_TEAM:
            newState = {...state}
            newState[action.team.id] = action.team
            return newState
        // case READ_BY_USER_ID:
        //     //fix this
        //     return {...state}

        case CREATE_TEAM:
            newState = {...state}
            newState[action.team.id] = action.team
            return newState

        case UPDATE_TEAM:
            newState = {...state}
            newState[action.team.id] = action.team
            return newState

        case DELETE_TEAM:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state

    }
}

export default teamsReducer

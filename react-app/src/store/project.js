//action types
const READ_PROJECTS = 'projects/READ_PROJECTS' //p1
const READ_SINGLE_PROJECT = 'projects/READ_SINGLE_PROJECT' //p2
// const READ_BY_USER_ID = 'projects/READ_BY_USER_ID' //p3
const CREATE_PROJECT = 'projects/CREATE_PROJECT' //p4
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT' //p5
const DELETE_PROJECT = 'projects/DELETE_PROJECT' //p6


//action creators
const getAll = ({Projects}) => ({
    type: READ_PROJECTS,
    Projects
})

const getOne = (project) => ({
    type: READ_SINGLE_PROJECT,
    project
}
)

// const getById = ({Projects}) => ({
//     type: READ_BY_USER_ID,
//     Projects
// })

const create = (project) => ({
    type: CREATE_PROJECT,
    project
})

const edit = (project) => ({
    type: UPDATE_PROJECT,
    project
})

const remove = (id) => ({
    type: DELETE_PROJECT,
    id
})



//thunks
export const fetchAllProjects = () => async dispatch => {
    const response = await fetch(`/api/projects`);

    if(response.ok){
        const projectsList = await response.json()
        // console.log('projectlist', projectsList)
        dispatch(getAll(projectsList))
    }
    if(response.status>=400) throw response
}

export const fetchOneProject = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}`)
    if(response.ok){
        const singleProject = await response.json()
        dispatch(getOne(singleProject))
    }
    if(response.status>=400) throw response
}

//add get by user id fetch later

export const fetchCreateProject = (project) => async dispatch => {
    const response = await fetch(`/api/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
    if(response.ok){
        const newProject = await response.json()
        dispatch(create(newProject))
        return newProject
    }
    if(response.status>=400) throw response
}

export const fetchUpdateProject = (project) => async dispatch => {
    const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
    if(response.ok){
        const editProject = await response.json()
        dispatch(edit(editProject))
        return editProject
    }
    if(response.status>=400) throw response
}

export const fetchDeleteProject = (id) => async dispatch => {
    const response = await fetch(`/api/projects/${id}`, {
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

const projectsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_PROJECTS:
            newState={...state}
            action.Projects.forEach(project => {
            newState[project.id] = project
            })
            return newState

        case READ_SINGLE_PROJECT:
            newState = {...state}
            newState[action.project.id] = action.project
            return newState

        case CREATE_PROJECT:
            newState = {...state}
            newState[action.project.id] = action.project
            return newState

        case UPDATE_PROJECT:
            newState = {...state}
            newState[action.project.id] = action.project
            return newState

        case DELETE_PROJECT:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state

    }
}

export default projectsReducer

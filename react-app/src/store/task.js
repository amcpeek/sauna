//T1 get all, (backend only)
//T2 get by task id (for edit)
//T3 create by project id
//T4 edit by task id
//T5 delete by task id
//T6 get by user id (add in future version)


//action types
const READ_SINGLE_TASK = 'tasks/READ_SINGLE_TASK'
const CREATE_TASK = 'tasks/CREATE_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'
const UPDATE_TASK = 'tasks/UPDATE_TASK'

//action creators
//T2
const getTask = (task) => ({
    type: READ_SINGLE_TASK,
    task
})
//T3
const createTask = (task) => ({
    type: CREATE_TASK,
    task
})
//T4
const editTask = (task) => ({
    type: UPDATE_TASK,
    task
})
//T5
const deleteTask = (id) => ({
    type: DELETE_TASK,
    id
})

//thunks
//T2
export const fetchOneTask = (Id) => async dispatch => {
    const response = await fetch(`/api/tasks/${Id}`)
    if(response.ok){
        const singleTask = await response.json()
        dispatch(getTask(singleTask))
    }
    if(response.status>=400) throw response
}
//T3
export const fetchCreateTask = (task, projectId) => async dispatch => {

    const response = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    if(response.ok){
        const newTask = await response.json()
        dispatch(createTask(newTask))
        return newTask
    }
    if(response.status>=400) throw response
}
//T4
export const fetchUpdateTask = (task) => async dispatch => {
    const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    if(response.ok){
        const editTask = await response.json()
        dispatch(editTask(editTask))
        return editTask
    }
    if(response.status>=400) throw response
}
//T5
export const fetchDeleteTask = (id) => async dispatch => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(deleteTask(id))
        return response
    }
    if(response.status>=400) throw response
}

//reducer

const initialState = {}

const tasksReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        // case READ_TASKS:
        //     newState={...state}
        //     action.Tasks.forEach(task => {
        //         newState[task.id] = task
        //     })
        //     return newState

        case READ_SINGLE_TASK:
            const oneState = {...state}
            oneState[action.task.id] = action.task
            return oneState

        case CREATE_TASK:
            newState = {...state}
            newState[action.task.id] = action.task
            return newState

        case UPDATE_TASK:
            newState = {...state}
            newState[action.task.id] = action.task
            return newState

        case DELETE_TASK:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state

    }
}

export default tasksReducer

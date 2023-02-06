//T1 get all, (backend only)
//T2 get by task id (for edit)
//T3 create by project id
//T4 edit by task id
//T5 delete by task id
//T6 get by user id (add in future version)
//T7 get by project id


//action types
const READ_TASKS = 'tasks/READ_TASKS' //p1
const READ_SINGLE_TASK = 'tasks/READ_SINGLE_TASK'
const CREATE_TASK = 'tasks/CREATE_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'
const UPDATE_TASK = 'tasks/UPDATE_TASK'
const READ_TASKS_BY_PROJECT_ID = 'tasks/READ_TASKS_BY_PROJECT_ID'
//action creators
//T1
const getAll = ({Tasks}) => ({
    type: READ_TASKS,
    Tasks
})

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
const deleteTask = (task) => ({
    type: DELETE_TASK,
    task
})

//T7
const getByProject = ({Tasks}) => ({
    type: READ_TASKS_BY_PROJECT_ID,
    Tasks
})

//thunks
//T1
export const fetchAllTasks = () => async dispatch => {
    const response = await fetch(`/api/tasks`);
   // console.log('are we getting to the fetch', response)

    if(response.ok){
        const tasksList = await response.json()
        //console.log('taskList', tasksList)
        dispatch(getAll(tasksList))
    }
    if(response.status>=400) throw response
}

//T2
export const fetchOneTask = (id) => async dispatch => {
    const response = await fetch(`/api/tasks/${id}`)
    if(response.ok){
        const singleTask = await response.json()
        dispatch(getTask(singleTask))
    }
    if(response.status>=400) throw response
}
//T3
export const fetchCreateTask = (task, projectId) => async dispatch => {

    //console.log('createFetch', task, projectId)
    const response = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    if(response.ok){

        const newTask = await response.json()
        //console.log('newtask', newTask)
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
        const updatedTask = await response.json()
        dispatch(editTask(updatedTask))
        return updatedTask
    }
    if(response.status>=400) throw response
}
//T5
export const fetchDeleteTask = (task) => async dispatch => {
    const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(deleteTask(task))
        return response
    }
    if(response.status>=400) throw response
}

//T7
export const getAllTasksByProjectId = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/tasks`)
    if(response.ok){

        const taskList = await response.json()
        //console.log('taskList', taskList)
        dispatch(getByProject(taskList))
    }
}

//reducer

// plan to add tasks by user id, so state shape make more sense

const initialState = {}

const tasksReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        // case READ_TASKS:
        //     //console.log('are we getting to the reducer')
        //     newState={...state, allTasks: {...state}}
        //     const nextLevelAll = {}
        //     if(!action.Tasks.length) {
        //         return {...state}
        //     }
        //     action.Tasks.forEach(task => {
        //         nextLevelAll[task.id] = task
        //     })
        //     return {
        //         ...state,
        //         allTasks: { nextLevelAll }
        //     }
        case READ_TASKS:
            newState={}
            //console.log('action.Tasks', action.Tasks)
            action.Tasks.forEach(task => {
            newState[task.id] = task
            })
            return newState





        case READ_TASKS_BY_PROJECT_ID:
            newState = { ...state}

            const nextLevel = {}
            if(!action.Tasks.length) {
                return {...state}
            }
            action.Tasks.forEach(task => {
                nextLevel[task.id] = task
            })
            return {
                ...state,
                tasksByProjectId: { [action.Tasks[0].projectId]: nextLevel }
            }

        case READ_SINGLE_TASK: //this doe not red in the tasksByProjectId
            newState = {...state}
            newState[action.task.id] = action.task
            return newState

        case CREATE_TASK:
            newState = {...state, tasksByProjectId: {...state.tasksByProjectId}}
           if(!newState.tasksByProjectId[action.task.projectId]) {
            newState.tasksByProjectId[action.task.projectId] = { [action.task.id]: action.task}
           } else {
            newState.tasksByProjectId[action.task.projectId] = {...state.tasksByProjectId[action.task.projectId], [action.task.id]: action.task}
           }










        //    if(!newState[action.task.id]) {
        //     newState = {[action.task.id]: action.task}
        //    } else {
        //     newState = {...state[action.task.id], [action.task.id]: action.task}
        //    }
            newState[action.task.id] = action.task
            return newState

        case UPDATE_TASK:
            newState = {...state, tasksByProjectId: {...state.tasksByProjectId}}
            newState.tasksByProjectId[action.task.projectId] = {...state.tasksByProjectId[action.task.projectId], [action.task.id]: action.task}


            // newState = {...state[action.task.id], [action.task.id]: action.task}
            newState[action.task.id] = action.task
            return newState

        case DELETE_TASK:
            newState = {...state, tasksByProjectId: {...state.tasksByProjectId}}
            delete newState[action.task.id]
            delete newState.tasksByProjectId[action.task.projectId][action.task.id]
            return newState

        default:
            return state
    }
}

export default tasksReducer

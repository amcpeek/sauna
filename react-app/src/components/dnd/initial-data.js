

const initialData = {
    tasks: { //task > taskByProjectId > taskId: {object just like this} but it includes stage Id
        'task-1': {id: 'task-1', content: 'Take out the garbage'},
        'task-2': {id: 'task-2', content: 'Watch my favorite show'},
        'task-3': {id: 'task-3', content: 'Charge my phone'},
        'task-4': {id: 'task-4', content: 'Cook dinner'},
    },
    columns: { //I don't currently have this like this, I wonder if i could avoid making it? would need to create it on the backend,
        //could be get columns by project Id
        //i could make this on the front end
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Complete',
            taskIds: []
        },
    },
    //Facilitate reordering of the columns //this could be stageId
    columnOrder: ['column-1',
    'column-2',
    'column-3'
]
}

export default initialData;

import React, { useState } from "react";

const NewTask = ({ task, provided, innerRef, isDragging,  selectedTask, showTask, setSelectedTask, setShowTask }) => {
    const showTaskFunc = (task) => {
        console.log('task.id', task.id, 'selectedTask', selectedTask, "showTask", showTask, "setShowTask", setShowTask, 'setSelectedTask', setSelectedTask)
         setSelectedTask(task)
         showTask? setShowTask(false): setShowTask(true)
     }

    if (!task) return null
    return (
        <>
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                className={isDragging? `taskViewOnDrag` : 'taskView'}
                onClick={() => (showTaskFunc(task))}
            >
                <div className=''>
                <i className="fa-regular fa-circle-check"></i>&nbsp;&nbsp;
                    {task.name}
                </div>
            </div>
        </>
    )
}

export default NewTask;

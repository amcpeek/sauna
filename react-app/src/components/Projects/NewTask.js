import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loadBoardsThunk } from "../store/board";
// import { CardDetailModal } from "./context/CardDetailsModal";
// import styles from "./cssModules/SingleCard.module.css"
// import SingleCardDetails from "./SingleCardDetails";
import ViewTask from '../Tasks/ViewTask';

import EditTask from '../Tasks/EditTask';

const NewTask = ({ task, provided, innerRef, isDragging,  selectedTask, showTask, setSelectedTask, setShowTask }) => {
    // const [showCardDetailsModal, setShowCardDetailsModal] = useState(false)
    // const [selectedTask, setSelectedTask] = useState(1)
    // const [showTask, setShowTask] = useState(false)

    // const openCardDetails = () => {
    //     setShowCardDetailsModal(true)
    // }
    const showTaskFunc = (task) => {
        // console.log('is task being passed int', task)
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
                className={isDragging? `taskView` : 'taskView'}
                onClick={() => (showTaskFunc(task))}
            >
                <div className=''>
                <i className="fa-regular fa-circle-check"></i>&nbsp;&nbsp;
                    {task.name}
                </div>
            </div>
            {/* {showCardDetailsModal && (<CardDetailModal onClose={() => setShowCardDetailsModal(false) }>
                <SingleCardDetails card={card} setShowCardDetailsModal={setShowCardDetailsModal} />
            </CardDetailModal>
            )} */}

{/* having it in here makes it open all of them together */}

                         {/* {showTask && selectedTask &&
                          <div className='editTaskView'>
                          <div  className="jc-end just-text-button b-margin bg-white round-sq-05 height-task width-90-per" style={!showTask ? { transform: 'translateX(+105%)' } : {}}>
                              <button className=" width-100-per col just-text-button b-margin bg-white round-sq-05 height-task " >
                              <ViewTask selectedTask={selectedTask}/>
                              <EditTask selectedTask={selectedTask} showTask={showTask} setShowTask={setShowTask}/>
                              </button>
                          </div>
                      </div>
                         } */}
        </>
    )
}

export default NewTask;

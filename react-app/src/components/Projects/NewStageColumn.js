import React, { useContext, useEffect, useRef, useState } from "react";
// import styles from "./cssModules/ListColumn.module.css"
//import CreateCardForm from "./forms/CreateCardForm";

import { Draggable } from "@hello-pangea/dnd";
//import SingleCard from "./SingleCard";
import { useDispatch, useSelector } from "react-redux";
// import { loadCardsAction } from "../store/cards";
//import editicon from "../assets/editicon.svg"
//import deleteicon from "../assets/deleteicon.svg"
// import { deleteListThunk, editListThunk } from "../store/list";
// import { SubmittedContext } from "./context/SubmittedContext";
// import { DeleteListModal } from "./context/DeleteListModal";
// import DeleteListForm from "./forms/DeleteListForm";
import NewTask from "./NewTask";

const StageColumn = ({
  column,
  provided,
  isDraggingOver,
  selectedTask,
  showTask,
  setSelectedTask,
  setShowTask,
}) => {
  const dispatch = useDispatch();
  // Grab cards from state and filter out to display appropriate cards by list id
  //const cardsArr = useSelector(state => Object.values(state.cards))
  //let cards = cardsArr.filter(card => card.list_id === list.id)
  //const [showAddCardModal, setShowAddCardModal] = useState("")
  //const [showEditMode, setShowEditMode] = useState(false)
  //const [showDeleteModal, setShowDeleteModal] = useState(false)
  //const [displayAddButtons, setDisplayAddButtons] = useState()
  //const [name, setName] = useState(list.name)
  // const [selectedTask, setSelectedTask] = useState(1)
  // const [showTask, setShowTask] = useState(false)
  const [showAddTask1, setShowAddTask1] = useState(false);
  const [showAddTask2, setShowAddTask2] = useState(false);
  const [showAddTask3, setShowAddTask3] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const editRef = useRef(null);
  // const { setHasSubmitted } = useContext(SubmittedContext)

  // const flipCardForm = (e) => {
  //     e.preventDefault()
  //     setShowAddCardModal(true)
  //     // if (alreadyflip && displayAddButtons == list.id)
  //     setDisplayAddButtons(list.id)
  // }

  // const flipEditModal = () => {
  //     setShowEditMode(!showEditMode)
  // }

  // const submitEdit = async (e) => {
  //     e.preventDefault()
  //     const input = {
  //         name,
  //         listId: list.id
  //     }
  //     setShowEditMode(false)
  //     await dispatch(editListThunk(input))
  //     setHasSubmitted(prev => !prev)
  // }

  // const flipDeleteModal = (e) => {
  //     e.preventDefault()
  //     setShowDeleteModal(!showDeleteModal)
  // }

  // const submitDelete = async () => {
  //     setShowDeleteModal(false)
  //     await dispatch(deleteListThunk(list.id))
  //     setHasSubmitted(prev => !prev)
  // }

  // useEffect(() => {
  //     dispatch(loadCardsAction(list.cards))
  // }, [dispatch, list.cards])

  // Select the input when toggling edit mode for list column
  // useEffect(() => { //no idea what this is doing
  //     if (showEditMode) {
  //         editRef.current?.focus()
  //     }
  // }, [editRef, showEditMode])

  if (!column) return null;
  return (
    <div className={""} ref={provided.innerRef} {...provided.droppableProps}>
      <div className={"minDropSpace"}>
        {column.map((task, index) => (
          <div key={task.id} className={"boxOutsideColumn"}>
            <Draggable draggableId={task.id.toString()} index={index}>
              {(provided, snapshot) => (
                <NewTask
                  provided={provided}
                  innerRef={provided.innerRef}
                  task={task}
                  index={index}
                  isDragging={snapshot.isDragging}
                  selectedTask={selectedTask}
                  showTask={showTask}
                  setSelectedTask={setSelectedTask}
                  setShowTask={setShowTask}
                />
              )}
            </Draggable>
          </div>
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
};

export default StageColumn;

import React from 'react';
import ReactDOM from 'react-dom/client';
import initialData from './initial-data';
import Column from './column'
import styled from 'styled-components'
// import { DragDropContext } from 'react-beautiful-dnd'
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
// import '@atlaskit/css-reset'
// import './index.css';
import App from '../../App'
import BetterData from './betterData';






// import reportWebVitals from './reportWebVitals';

//const App = () => "What up world"
const Container = styled.div`
display: flex;
`

class InnerList extends React.PureComponent {
  //if you use React.Component, this is necessary, but with PureComponent it is not
  // shouldComponentUpdate(nextProps) {
  //   if(nextProps.column === this.props.column &&
  //     nextProps.taskMap === this.props.taskMap &&
  //     nextProps.index === this.props.index
  //     ) { return false }
  //     return true
  // }
  render() {
    const { column, taskMap, index} = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId])
    return <Column column={column} tasks={tasks} index={index}/>
  }
} //end InnerList


export default class DndProject extends React.Component {
   
  state = initialData




  onDragStart = (start) => {
    // document.body.style.color = 'orange';
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId)
    this.setState({
      homeIndex,
    })
  }; //end onDragStart

  // onDragUpdate = (update) => {
  //   const {destination} = update;
  //   const opacity = destination
  //   ? destination.index / Object.keys(this.state.tasks).length
  //   : 0;
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  // }  //end onDragUpdate

  onDragEnd = result => {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    this.setState({
      homeIndex: null
    })

    const { destination, source, draggableId, type } = result
    if (!destination) {
      return
    }

    if(destination.draggableId === source.droppableId &&
      destination.index === source.index
      ) {
        return
      }

      if(type === 'column') {
        const newColumnOrder = Array.from(this.state.columnOrder)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0, draggableId)

        const newState = {
          ...this.state,
          columnOrder: newColumnOrder
        }
        this.setState(newState)
        return
      }

      const start = this.state.columns[source.droppableId]
      const finish = this.state.columns[destination.droppableId]

      if (start === finish ) {
        const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds

      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
      }

      ///end of if stays in one column


      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      this.setState(newState)
      return

  } //end of onDragEnd in App



  render() { //render of the app
    return (
      <DragDropContext
      onDragStart={this.onDragStart}
      // onDragUpdate={this.onDragUpdate}
      onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-columns" direction='horizontal' type='column'>

          {(provided) => ( //not using snapshot now, but it would go in here
                <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId]
              // const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]) //this is used if you aren't worried about the rerendering of the whole list
              // const isDropDisabled = index < this.state.homeIndex
              // return column.title
              return (
                // <Column key={column.id} column={column} tasks={tasks} index={index}  /> //this is used if you aren't worried about rerendering
                <InnerList key={column.id} column={column} taskMap={this.state.tasks} index={index}/>
              )
              // isDropDisabled={isDropDisabled}

            })}
            {provided.placeholder}
              <BetterData/>

                </Container>

          )}

        </Droppable>
    </DragDropContext>

    )
  }
} //end App


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

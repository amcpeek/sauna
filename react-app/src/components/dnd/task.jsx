import React from 'react'
import styled from 'styled-components'
import { Draggable } from '@hello-pangea/dnd';

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
// margin-right: 8px;
// justify-content: center;
// align-items: center;

background-color: ${props =>
    props.isDragDisabled
    ?'lightgrey'
    :props.isDragging
    ?'lightgreen'
    :'white'};
// display: flex;
// width: 40px;
// height: 40px;
// border-radius: 50%;

//the focus style does not seem to work
// &:focus {
//     outline: none;
//     border-color: red;
// }
`

//background-color: ${props => (props.isDragging ? 'lightgreen': 'white')}; simple just color while draggin

// const Handle = styled.div`
// width: 20px;
// height: 20px;
// background-color: orange;
// border-radius: 4px;
// margin-right: 8px;
// `

export default class Task extends React.Component {
    render () {
        // const isDragDisabled = this.props.task.id === 'task-1'
        return (
            <Draggable
            draggableId={this.props.task.id}
            index={this.props.index}
            // isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                     <Container
                     {...provided.draggableProps}
                     {...provided.dragHandleProps} //with this line the whole thing can drag
                     ref={provided.innerRef}
                     isDragging={snapshot.isDragging}
                    //  isDragDisabled={isDragDisabled}
                     >
                        {/* <Handle
                        //if you put thie drag handle in here, can only drag the task from the handle
                        {...provided.dragHandleProps}
                        /> */}
                    {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        )
    }
}

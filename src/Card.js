import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import './Drop.css'

const cardSource = {
    beginDrag(props) {
        console.log("begin--->", props)
        return {
            id: props.id,
            index: props.index,
            text: props.text,
            boxId: props.boxid
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    }
};

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        console.log("card-moving", dragIndex, hoverIndex,)
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.changeCard(dragIndex, null, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },

}

function dropCollect(connect, monitor) {
    return {
        // connectDropTarget: connect.dropTarget(),
        // isDragging: monitor.dropp()
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        // isOver: monitor.isOver(),
        // isOverCurrent: monitor.isOver({ shallow: true }),
        // canDrop: monitor.canDrop(),
        // itemType: monitor.getItemType()
    };
}

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children, id, text, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0.5 : 1;
        return connectDragSource(
            connectDropTarget(<div className="card" style={ {opactiy: opacity} }>
                {text}
            </div>)
    );
    }
}
let DropCard = DropTarget('card', cardTarget, dropCollect)(Card);
 let DragCard = DragSource('card', cardSource, dragCollect)(DropCard)

export default DragCard

// export default DragSource( 'card', cardSource, dragCollect)(Card)
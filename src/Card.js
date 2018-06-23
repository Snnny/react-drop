import React from 'react'
import { DragSource } from 'react-dnd'
import './Drop.css'
const cardSource = {
    beginDrag(props) {
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
class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children, id, text, connectDragSource } = this.props;
        return connectDragSource(
            <div className="card">
                {text}
            </div>
    );
    }
}

export default DragSource( 'card', cardSource, dragCollect)(Card)
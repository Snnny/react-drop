import React from 'react'
import { DropTarget } from 'react-dnd'

const cardBoxTarget = {
    hover(props, monitor, component) {
        const hoverCard = monitor.getItem();
        if (hoverCard.id && props.boxid != hoverCard.boxId){
            props.changeCard(hoverCard.index, props.boxid);
        }
    }
};
function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class CardBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className="cardBox">
            { children }
            </div>
    );
    }
}

export default DropTarget('card', cardBoxTarget, dropCollect)(CardBox);

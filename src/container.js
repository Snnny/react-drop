import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import CardBox from './CardBox'
import './Drop.css'
const update = require('immutability-helper')


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                {id: 1, text: 'card 1', boxId: 1 },
                {id: 2, text: 'card 2', boxId: 1 },
                {id: 3, text: 'card 3', boxId: 2 },
                {id: 4, text: 'card 4', boxId: 2 },
            ],
            boxes: [
                {id: 1, boxId: 1},
                {id: 2, boxId: 2}
            ]
        }
    }
    changeCard=(index, newBoxId)=> {
        const dragCard = this.state.cards[index]
        if (!dragCard){ return }

        dragCard.boxId = newBoxId

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1],
                    [index, 0, dragCard]
                ]
            }
        }));
    }
    render() {
        return (
            <div className="wrap">
            { this.state.boxes.map( box => {
                return (
            <CardBox
                key={'cb-'+box.boxId}
                changeCard={this.changeCard}
                boxid={box.boxId}>
                { this.state.cards.map( (card, index) => {
                    if (box.boxId==card.boxId)
                    return (
                        <Card
                    key={'c-'+card.id}
                    id={card.id}
                    index={index}
                    boxid={card.boxId}
                    text={card.text}
                    />
                )
                else return '';
                })}
            </CardBox>
        )
        })}
        </div>
    )}
}

export default DragDropContext(HTML5Backend)(Container)
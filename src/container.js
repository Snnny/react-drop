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
    changeCard =(index, newBoxId, newIndex)=> {
        console.log('moving', index, newBoxId, newIndex,)
        console.log("this", this.state)
        const dragCard = this.state.cards[index]
        if (!dragCard){ return }

        if (newBoxId && dragCard.boxId != newBoxId) {
            dragCard.boxId = newBoxId

            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [index, 1],
                        [index, 0, dragCard]
                    ]
                }
            }));
        } else if (newIndex && index != newIndex) {
            // newIndex 当卡片拖动到某个卡片的上面时，
            // newIndex 就是此某个卡片的 index
            // 将拖动的卡片 剪切到 此位置上
            //
            // dragCard.index ~= newIndex
            console.log("hover", newIndex, index)
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [index, 1],
                        [newIndex, 0, dragCard]
                    ]
                }
            }))
        }
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
                    changeCard={this.changeCard}
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
import React from "react";
import {useDrag} from "react-dnd";
import {CardDragPayload, ItemTypes} from "./dragndrop";

interface DraggableCardProps {
    cardId: string
    columnId: string
}

export const DraggableCard: React.FC<React.PropsWithChildren<DraggableCardProps>> = ({children, cardId, columnId}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {cardId: cardId, columnId: columnId} as CardDragPayload,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))
    const opacity = isDragging ? 0.25 : 1

    return (
        <div ref={drag} style={{opacity: opacity}}>
            {children}
        </div>
    )
}
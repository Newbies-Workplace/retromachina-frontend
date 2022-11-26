import React from "react";
import {useDrag} from "react-dnd";
import {CardDragPayload, ItemTypes} from "./dragndrop";

interface DraggableCardProps {
    parentCardId: string | null
    cardId: string
    columnId: string
    style?: React.CSSProperties
}

export const DraggableCard: React.FC<React.PropsWithChildren<DraggableCardProps>> = ({children, parentCardId, cardId, columnId, style}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {parentCardId: parentCardId, cardId: cardId, columnId: columnId} as CardDragPayload,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))
    const opacity = isDragging ? 0.25 : 1

    return (
        <div ref={drag} style={{opacity: opacity, ...style}}>
            {children}
        </div>
    )
}
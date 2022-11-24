import React from "react";
import {useDrop} from "react-dnd";
import {CardDragPayload, ItemTypes} from "./dragndrop";

interface GroupCardContainerProps {
    parentCardId: string
    onCardDropped: (cardId: string, fromColumnId: string) => void
}

export const GroupCardContainer: React.FC<React.PropsWithChildren<GroupCardContainerProps>> = ({children, parentCardId, onCardDropped}) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: (item: CardDragPayload) => {
            onCardDropped(item.cardId, item.columnId)
        },
        canDrop: (item: CardDragPayload) => item.cardId !== parentCardId && item.parentCardId !== parentCardId,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }), [parentCardId])

    return (
        <div ref={drop} style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 100,
            minWidth: 100,
        }}>
            {children}
        </div>
    )
}
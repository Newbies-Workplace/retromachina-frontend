import React from "react";
import {useDrop} from "react-dnd";
import styles from '../column/ColumnCardContainer.module.scss'
import {CardDragPayload, ItemTypes} from "./dragndrop";

interface ColumnCardContainerProps {
    columnId: string
    onCardDropped: (cardId: string, fromColumnId: string) => void
}

export const ColumnCardContainer: React.FC<React.PropsWithChildren<ColumnCardContainerProps>> = ({children, columnId, onCardDropped}) => {
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: CardDragPayload) => onCardDropped(item.cardId, item.columnId),
            canDrop: (item: CardDragPayload) => item.columnId !== columnId,
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            })
        }),
        [columnId]
    )

    return <div ref={drop} style={{height: '100%', backgroundColor: isOver && canDrop ? 'yellow' : 'transparent'}} className={styles.container}>
        {children}
    </div>
}

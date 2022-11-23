import React from "react";
import {ItemTypes} from "../utils";
import {useDrop} from "react-dnd";

interface ColumnCardContainerProps {
    columnId: string
    onCardDropped: (cardId: string) => void
}

export const ColumnCardContainer: React.FC<React.PropsWithChildren<ColumnCardContainerProps>> = ({children, columnId, onCardDropped}) => {
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: any) => onCardDropped(item.id), //todo typy
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
        }),
        [columnId]
    )

    return <div ref={drop} style={{height: '100%', backgroundColor: isOver ? 'yellow' : 'transparent'}}>
        {children}
    </div>
}

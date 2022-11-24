export const ItemTypes = {
    CARD: 'card',
    GROUP: 'group'
}

export interface CardDragPayload {
    cardId: string
    columnId: string
}
export interface Board {
    columns: BoardColumn[]
    defaultColumnId: string
}

export interface BoardColumn {
    id: string
    name: string
    color: string
    order: number
}
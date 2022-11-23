export interface ReadyCommand {
    readyState: boolean
}

export interface NewCardCommand {
    id: string,
    text: string,
    authorId: string,
    columnId: string
}

export interface DeleteCardCommand {
    cardId: string,
}

export interface WriteStateCommand {
    writeState: boolean
    columnId: string
}

export interface SetTimerCommand {
    timestamp: number | null
}

export interface RoomStateCommand {
    roomState: RoomState
}

export type RoomState = "reflection" | "group" | "vote" | "discuss";

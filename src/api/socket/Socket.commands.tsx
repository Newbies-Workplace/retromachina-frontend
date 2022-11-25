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

export interface AddCardToCardCommand {
    parentCardId: string;
    cardId: string;
}

export interface MoveCardToColumnCommand {
    columnId: string;
    cardId: string;
}
export interface changeOwnerCommand{
    apId: string
    userId: string
}
export interface createActionPointCommand{
    text: string
    ownerId: string
}
export interface AddVoteCommand {
    parentCardId: string
}
export interface RemoveVoteCommand {
    parentCardId: string
}
export interface SetMaxVotesCommand {
    votesAmount: number
}

export type RoomState = "reflection" | "group" | "vote" | "discuss";

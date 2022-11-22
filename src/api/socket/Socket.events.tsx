import {RoomState} from "./Socket.commands";

export interface ChangeTimerEvent {
    timerEnds: number | null //timestamp
}

export interface SocketCard {
    id: string
    columnId: string
    text: string
    authorId: string
}

export interface SocketColumn {
    id: string
    color: string
    name: string
    desc: string | null
    teamCardsAmount: number
    isWriting: boolean
}

export interface RoomData {
    roomState: RoomState
    teamId: string
    createdDate: Date
    maxVotes: number
    usersReady: number
    usersWriting: number
    retroColumns: SocketColumn[]
    cards: SocketCard[]
    users: {
        id: string
        isReady: boolean
    }[]
}

export interface OnJoinEvent {
    roomData: RoomData
}

export interface RoomSyncEvent {
    roomData: RoomData
}

export interface NewCardEvent {
    card: SocketCard
}

export interface DeleteCardEvent {
    cardId: string
}
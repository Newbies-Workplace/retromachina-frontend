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

export interface SocketUser {
    id: string
    isReady: boolean
    isWriting: boolean
}

export interface RoomData {
    roomState: RoomState
    teamId: string
    createdDate: Date
    timerEnds: number | null
    maxVotes: number
    usersReady: number
    usersWriting: number
    retroColumns: SocketColumn[]
    cards: SocketCard[]
    users: SocketUser[]
}

export interface OnJoinEvent {
    roomData: RoomData
}

export interface RoomSyncEvent {
    roomData: RoomData
}
import {RoomState} from "./Socket.commands";

export interface SocketVote{
    parentCardId: string,
    voterId: string
}

export interface ChangeTimerEvent {
    timerEnds: number | null //timestamp
}

export interface SocketCard {
    id: string
    parentCardId: string | null
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
export interface ActionPoint{
    id: string,
    ownerId: string;
    text: string;
    parentCardId: string;
}

export interface RoomData {
    roomState: RoomState
    teamId: string
    createdDate: Date
    timerEnds: number | null
    maxVotes: number
    votes: SocketVote[]
    usersReady: number
    usersWriting: number
    retroColumns: SocketColumn[]
    cards: SocketCard[]
    users: SocketUser[]
    actionPoints: ActionPoint[]
}

export interface OnJoinEvent {
    roomData: RoomData
}

export interface RoomSyncEvent {
    roomData: RoomData
}
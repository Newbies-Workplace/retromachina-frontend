import {RoomState} from "./Socket.commands";

export interface ChangeTimerEvent {
    timerEnds: number | null //timestamp
}

export interface OnJoinEvent {
    roomData: {
        roomState: RoomState
    }
}
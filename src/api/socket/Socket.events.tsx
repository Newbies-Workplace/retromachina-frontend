import { Column } from "../../views/retro_create/RetroCreateView";
import {RoomState} from "./Socket.commands";

export interface ChangeTimerEvent {
    timerEnds: number | null //timestamp
}

export interface Users{
    users:{
        id: string
        isReady: boolean
    }
}

export interface SocketCard{
    id: string
    columnId: string
    text: string
    authorId: string
  }
 export interface SocketColumn {
  id: string;
  color: string;
  name: string;
  desc: string | null;
  cards: SocketCard[]
}

export interface OnJoinEvent {
    roomData: {
        roomState: RoomState
        teamId: string
        createdDate: Date
        maxVotes: number
        usersReady: number
        usersWriting: number
        retroColumns: SocketColumn[]
        users: Users[]
    }
}
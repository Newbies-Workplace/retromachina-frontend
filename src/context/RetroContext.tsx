import React, {createContext, useEffect, useState} from "react";
import io from 'socket.io-client';
import {ChangeTimerEvent} from "../api/socket/Socket.events";
import {RoomState} from "../api/socket/Socket.commands";

interface RetroContextParams {
    retroId: string
}

interface RetroContext {
    retroId: string
    roomState: RoomState
    timerEnds: number | null
    ready: boolean
    setReady: (ready: boolean) => void
}

export const RetroContext = createContext<RetroContext>({
    retroId: '',
    roomState: 'reflection',
    timerEnds: null,
    ready: false,
    setReady: () => {},
})

export const RetroContextProvider: React.FC<React.PropsWithChildren<RetroContextParams>> = ({children, retroId}) => {
    //@ts-ignore
    const socket = io.connect(SOCKET_URL,{
        path:"/socket.io",
        query:{
            retro_id: retroId
        },
        extraHeaders: {
        //@ts-ignore
        Authorization : window.localStorage.getItem('Bearer')
    }
  });
  

    const [timerEnds, setTimerEnds] = useState<number | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [roomState, setRoomState] = useState<RoomState>('reflection')

    useEffect(() => {
        
        socket.on('connection', () => {
            
        });

        socket.on('event_change_timer', (e: ChangeTimerEvent) => {
            setTimerEnds(e.timerEnds)
        });

        return () => {
            socket.off('connection');
            socket.off('event_change_timer');
        };
    }, [])

    const setReady = (ready: boolean) => {
        socket.send("command_ready", {ready: ready})
        setIsReady(ready) //todo przegadajcie sobie co robić w wypadku errora
    }

    return (
        <RetroContext.Provider value={{
            retroId: retroId,
            timerEnds: timerEnds,
            ready: isReady,
            roomState: roomState,
            setReady: setReady,
        }}>
            {children}
        </RetroContext.Provider>
    )
}
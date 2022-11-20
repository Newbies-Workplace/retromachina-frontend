import React, {createContext, useCallback, useEffect, useRef, useState} from "react";
import io, {Socket} from 'socket.io-client';
import {ChangeTimerEvent, OnJoinEvent} from "../api/socket/Socket.events";
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
    const socket = useRef<Socket>()
    const [timerEnds, setTimerEnds] = useState<number | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [roomState, setRoomState] = useState<RoomState>('reflection')

    useEffect(() => {
        const createdSocket = io(
            SOCKET_URL, {
                query: {
                    retro_id: retroId
                },
                extraHeaders: {
                    //@ts-ignore
                    Authorization : window.localStorage.getItem('Bearer')
                }
            }
        )
        socket.current = createdSocket

        createdSocket.on('error', console.log)
        createdSocket.on('event_on_join', (event: OnJoinEvent) => {
            setRoomState(event.roomData.roomState)
        });

        createdSocket.on('event_change_timer', (e: ChangeTimerEvent) => {
            setTimerEnds(e.timerEnds)
        });

        return () => {
            createdSocket.removeAllListeners()
            createdSocket.disconnect()
        };
    }, [])

    const setReady = (ready: boolean) => {
        socket.current?.emit("command_ready", {ready: ready})
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
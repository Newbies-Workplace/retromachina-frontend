import React, {createContext, useEffect, useMemo, useRef, useState,} from "react";
import io, {Socket} from "socket.io-client";
import {
  ChangeTimerEvent,
  OnJoinEvent,
  RoomData,
  RoomSyncEvent,
  SocketCard,
  SocketColumn
} from "../api/socket/Socket.events";
import {
  DeleteCardCommand,
  NewCardCommand,
  ReadyCommand,
  RoomState,
  RoomStateCommand,
  SetTimerCommand,
  WriteStateCommand
} from "../api/socket/Socket.commands";
import {UserResponse} from "../api/user/User.interfaces";
import {v4 as uuidv4} from "uuid";
import {useUser} from "./UserContext.hook";
import {getUsersByTeamId} from "../api/user/User.service";

interface RetroContextParams {
  retroId: string
}

interface RetroContext {
  retroId: string
  columns: SocketColumn[]
  cards: SocketCard[]
  teamUsers: UserResponse[]
  roomState: RoomState

  timerEnds: number | null
  setTimer: (time: number | null) => void

  ready: boolean
  setReady: (ready: boolean) => void
  readyPercentage: number

  setWriting: (value: boolean, columnId: string) => void

  createCard: (text: string, columnId: string) => void
  deleteCard: (cardId: string) => void

  nextRoomState: () => void;
  prevRoomState: () => void;
}

export const RetroContext = createContext<RetroContext>({
  columns: [],
  cards: [],
  retroId: "",
  roomState: "reflection",
  timerEnds: null,
  setTimer: () => {},
  ready: false,
  readyPercentage: 0,
  teamUsers: [],
  setReady: () => {},
  setWriting: () => {},
  createCard: () => {},
  deleteCard: () => {},
  nextRoomState: () => {},
  prevRoomState: () => {},
});

export const RetroContextProvider: React.FC<React.PropsWithChildren<RetroContextParams>> = (
    {
      children,
      retroId,
    }
) => {
  const socket = useRef<Socket>()
  const [timerEnds, setTimerEnds] = useState<number | null>(0)
  const [isReady, setIsReady] = useState(false)
  const [roomState, setRoomState] = useState<RoomState>("reflection")
  const [teamUsers, setTeamUsers] = useState<UserResponse[]>([])
  const [columns, setColumns] = useState<SocketColumn[]>([])
  const [cards, setCards] = useState<SocketCard[]>([])
  const [usersReady, setUsersReady] = useState<number>(0)
  const {user} = useUser()

  const readyPercentage = useMemo(() => usersReady / teamUsers.length, [usersReady, teamUsers])

  useEffect(() => {
    const createdSocket = io(
        SOCKET_URL,
        {
          query: {
            retro_id: retroId,
          },
          extraHeaders: {
            //@ts-ignore
            Authorization: window.localStorage.getItem("Bearer"),
          },
        }
    );
    socket.current = createdSocket;

    createdSocket.on("error", console.log);

    const roomDataListener = (roomData: RoomData) => {
      setRoomState(roomData.roomState)
      setColumns(roomData.retroColumns)
      setCards(roomData.cards)
      setTimerEnds(roomData.timerEnds)
      setUsersReady(roomData.usersReady)
    }
    createdSocket.on("event_room_sync", (e: RoomSyncEvent) => {
      roomDataListener(e.roomData)
    })
    createdSocket.on("event_on_join", (e: OnJoinEvent) => {
      roomDataListener(e.roomData)

      getUsersByTeamId(e.roomData.teamId)
          .then((users) => setTeamUsers(users))
          .catch(console.log);
    });

    createdSocket.on("event_change_timer", (e: ChangeTimerEvent) => {
      setTimerEnds(e.timerEnds);
    });

    return () => {
      createdSocket.removeAllListeners();
      createdSocket.disconnect();
    };
  }, []);

  const setReady = (ready: boolean) => {
    const command: ReadyCommand = {
      readyState: ready
    }
    socket.current?.emit("command_ready", command);
    setIsReady(ready);
  };

  const setWriting = (value: boolean, columnId: string) => {
    const command: WriteStateCommand = {
      columnId: columnId,
      writeState: value,
    }
    socket.current?.emit("command_write_state", command);
  }

  const createCard = (text: string, columnId: string) => {
    const command: NewCardCommand = {
      id: uuidv4(),
      text: text,
      columnId: columnId,
      authorId: user!.user_id,
    }
    socket.current?.emit("command_new_card", command)
  }

  const deleteCard = (cardId: string) => {
    const command: DeleteCardCommand = {
      cardId: cardId
    }
    socket.current?.emit("command_delete_card", command)
  }

  const setTimer = (time: number | null) => {
    setTimerEnds(time)
    const command: SetTimerCommand = {
      timestamp: time
    }
    socket.current?.emit("command_change_timer", command)
  }

  const nextRoomState = () => {
    let state: RoomState;
    switch (roomState) {
      case "reflection":
        state = "group"
        break;
      case "group":
        state = "vote";
        break;
      case "vote":
        state = "discuss";
        break;
      case "discuss":
        return;
    }

    const command: RoomStateCommand = {
      roomState: state
    }

    socket.current?.emit("command_room_state", command)
  }

  const prevRoomState = () => {
    let state: RoomState;
    switch (roomState) {
      case "reflection":
        return;
      case "group":
        state = "reflection";
        break;
      case "vote":
        state = "group";
        break;
      case "discuss":
        state = "vote";
        break;
    }

    const command: RoomStateCommand = {
      roomState: state
    }
    socket.current?.emit("command_room_state", command)
  }

  return (
      <RetroContext.Provider
          value={{
            retroId: retroId,
            columns: columns,
            cards: cards,
            roomState: roomState,
            teamUsers: teamUsers,
            timerEnds: timerEnds,
            setTimer: setTimer,
            ready: isReady,
            setReady: setReady,
            readyPercentage: readyPercentage,
            setWriting: setWriting,
            createCard: createCard,
            deleteCard: deleteCard,
            nextRoomState: nextRoomState,
            prevRoomState: prevRoomState,
          }}
      >
        {children}
      </RetroContext.Provider>
  );
};

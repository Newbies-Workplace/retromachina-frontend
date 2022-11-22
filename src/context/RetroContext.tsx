import React, {
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import {
  ChangeTimerEvent,
  DeleteCardEvent,
  NewCardEvent,
  RoomData, RoomSyncEvent,
  SocketCard,
  SocketColumn
} from "../api/socket/Socket.events";
import { OnJoinEvent } from "../api/socket/Socket.events";
import {
  DeleteCardCommand,
  NewCardCommand,
  ReadyCommand,
  RoomState,
  WriteStateCommand
} from "../api/socket/Socket.commands";
import { axiosInstance } from "../api/AxiosInstance";
import { UserResponse } from "../api/user/User.interfaces";
import {v4 as uuidv4} from "uuid";
import {useUser} from "./UserContext.hook";

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

  ready: boolean
  setReady: (ready: boolean) => void

  setWriting: (value: boolean, columnId: string) => void

  createCard: (text: string, columnId: string) => void
  deleteCard: (cardId: string) => void
}

export const RetroContext = createContext<RetroContext>({
  columns: [],
  cards: [],
  retroId: "",
  roomState: "reflection",
  timerEnds: null,
  ready: false,
  teamUsers: [],
  setReady: () => {},
  setWriting: () => {},
  createCard: () => {},
  deleteCard: () => {},
});

export const RetroContextProvider: React.FC<
  React.PropsWithChildren<RetroContextParams>
> = ({children, retroId}) => {
  const socket = useRef<Socket>()
  const [timerEnds, setTimerEnds] = useState<number | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [roomState, setRoomState] = useState<RoomState>("reflection")
  const [teamUsers, setTeamUsers] = useState<UserResponse[]>([])
  const [columns, setColumns] = useState<SocketColumn[]>([])
  const [cards, setCards] = useState<SocketCard[]>([])
  const {user} = useUser()

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
    }
    createdSocket.on("event_room_sync", (e: RoomSyncEvent) => {
      roomDataListener(e.roomData)
    })
    createdSocket.on("event_on_join", (e: OnJoinEvent) => {
      roomDataListener(e.roomData)

      axiosInstance.get<UserResponse[]>(`users?team_id=${e.roomData.teamId}`)
        .then((response) => {
          setTeamUsers(response.data);
        })
        .catch(console.log);
    });

    createdSocket.on("event_change_timer", (e: ChangeTimerEvent) => {
      setTimerEnds(e.timerEnds);
    });

    createdSocket.on("event_new_card", (e: NewCardEvent) => {
      setCards((prevCards) => [e.card, ...prevCards])
    })
    createdSocket.on("event_delete_card", (e: DeleteCardEvent) => {
      const deletedIndex = cards.findIndex(c => c.id === e.cardId)

      if (deletedIndex !== -1) {
        const newCards = cards.splice(deletedIndex, 1)
        setCards(newCards)
      }
    })

    return () => {
      createdSocket.removeAllListeners();
      createdSocket.disconnect();
    };
  }, []);

  const setReady = (ready: boolean) => {
    const command: ReadyCommand = {
      ready: ready
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

  return (
    <RetroContext.Provider
      value={{
        retroId: retroId,
        columns: columns,
        cards: cards,
        roomState: roomState,
        teamUsers: teamUsers,
        timerEnds: timerEnds,
        ready: isReady,
        setReady: setReady,
        setWriting: setWriting,
        createCard: createCard,
        deleteCard: deleteCard,
      }}
    >
      {children}
    </RetroContext.Provider>
  );
};

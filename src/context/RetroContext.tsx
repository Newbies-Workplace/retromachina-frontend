import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { ChangeTimerEvent } from "../api/socket/Socket.events";
import { OnJoinEvent } from "../api/socket/Socket.events";
import { RoomState } from "../api/socket/Socket.commands";
import { axiosInstance } from "../api/AxiosInstance";
import { UserResponse } from "../api/user/User.interfaces";

interface RetroContextParams {
  retroId: string;
  onRun: boolean;
}

interface RetroContext {
  onRun: boolean;
  retroId: string;
  roomState: RoomState;
  timerEnds: number | null;
  ready: boolean;
  teamUsers: UserResponse[];
  setReady: (ready: boolean) => void;
}

export const RetroContext = createContext<RetroContext>({
  onRun: false,
  retroId: "",
  roomState: "reflection",
  timerEnds: null,
  ready: false,
  teamUsers: [],
  setReady: () => {},
});

export const RetroContextProvider: React.FC<
  React.PropsWithChildren<RetroContextParams>
> = ({ children, retroId, onRun }) => {
  const socket = useRef<Socket>();
  const [timerEnds, setTimerEnds] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [roomState, setRoomState] = useState<RoomState>("reflection");
  const [teamUsers, setTeamUsers] = useState<UserResponse[]>([]);
  const [columns, setColumns] = useState();
  const [column, setColumn] = useState();

  useEffect(() => {
    const createdSocket = io(
      //@ts-ignore
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

    createdSocket.on("event_on_join", (event: OnJoinEvent) => {
      setRoomState(event.roomData.roomState);
      onRun = true;

      axiosInstance
        .get(`users?team_id=${event.roomData.teamId}`)
        .then((response) => {
          setTeamUsers(response.data);
        })
        .catch(console.log);
    });

    createdSocket.on("event_change_timer", (e: ChangeTimerEvent) => {
      setTimerEnds(e.timerEnds);
    });

    return () => {
      createdSocket.removeAllListeners();
      createdSocket.disconnect();
      onRun = false;
    };
  }, []);

  const setReady = (ready: boolean) => {
    socket.current?.emit("command_ready", { ready: ready });
    setIsReady(ready); //todo przegadajcie sobie co robić w wypadku errora
  };

  return (
    <RetroContext.Provider
      value={{
        onRun: onRun,
        retroId: retroId,
        timerEnds: timerEnds,
        ready: isReady,
        roomState: roomState,
        setReady: setReady,
        teamUsers: teamUsers,
      }}
    >
      {children}
    </RetroContext.Provider>
  );
};

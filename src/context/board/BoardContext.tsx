import React, {createContext, useEffect, useRef, useState} from "react";
import io, {Socket} from "socket.io-client";
import {TaskUpdatedEvent} from "../../api/board/Board.events";
import {Board} from "../../api/board/Board.interface";
import {getBoard} from "../../api/board/Board.service";
import {getUsersByTeamId} from "../../api/user/User.service";
import {UserResponse} from "../../api/user/User.interfaces";
import {TaskUpdateCommand} from "../../api/board/Board.commands";

interface BoardContextParams {
    teamId: string
}

interface BoardContext {
    teamId: string
    board: Board | null
    teamUsers: UserResponse[]
    moveTask: (taskId: string, targetColumnId: string) => void
    changeTaskOwner: (taskId: string, newOwnerId: string) => void
}

export const BoardContext = createContext<BoardContext>({
    teamId: '',
    board: null,
    teamUsers: [],
    moveTask: () => {},
    changeTaskOwner: () => {},
})

export const BoardContextProvider: React.FC<React.PropsWithChildren<BoardContextParams>> = (
    {
        children,
        teamId,
    }
) => {
    const socket = useRef<Socket>()
    const [board, setBoard] = useState<Board | null>(null)
    const [teamUsers, setTeamUsers] = useState<UserResponse[]>([])

    useEffect(() => {
        getBoard(teamId)
            .then(board => setBoard(board))

        getUsersByTeamId(teamId)
            .then((users) => setTeamUsers(users))
            .catch(console.log);
    }, [teamId])

    useEffect(() => {
        const createdSocket = io(
            `${SOCKET_URL}/board`,
            {
                query: {
                    team_id: teamId,
                },
                extraHeaders: {
                    //@ts-ignore
                    Authorization: window.localStorage.getItem("Bearer"),
                },
            }
        );
        socket.current = createdSocket;

        createdSocket.on("task_updated_event", (event: TaskUpdatedEvent) => {
            setBoard((board) => board
                ? {
                    ...board,
                    tasks: board.tasks.map((task) => {
                        if (task.id === event.taskId) {
                            task.columnId = event.columnId
                            task.ownerId = event.ownerId
                        }

                        return task
                    })
                }
                : null
            )
        })

        createdSocket.on("error", console.log);

        return () => {
            createdSocket.removeAllListeners()
            createdSocket.disconnect()
        }
    }, [])

    const moveTask = (taskId: string, targetColumnId: string) => {
        const command: TaskUpdateCommand = {
            taskId: taskId,
            columnId: targetColumnId,
        }

        socket.current?.emit("command_update_task", command)
    }

    const changeTaskOwner = (taskId: string, newOwnerId: string) => {
        const command: TaskUpdateCommand = {
            taskId: taskId,
            ownerId: newOwnerId,
        }

        socket.current?.emit("command_update_task", command)
    }

    return (
        <BoardContext.Provider
            value={{
                teamId: teamId,
                board: board,
                teamUsers: teamUsers,
                moveTask: moveTask,
                changeTaskOwner: changeTaskOwner,
            }}
        >
            {children}
        </BoardContext.Provider>
    )
}
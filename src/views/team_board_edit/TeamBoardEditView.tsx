import {Navigate, useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {HeaderBar} from "../../component/header_bar/HeaderBar";
import Navbar from "../../component/navbar/Navbar";
import {Board, BoardColumn} from "../../interfaces/Board.interface";
import {editBoard, getBoard} from "../../api/team/Team.service";
import {ColumnCreate} from "../../component/column_create/ColumnCreate";
import styles from "./TeamBoardEditView.module.scss";
import {Button} from "../../component/button/Button";
import AddIcon from "../../assets/icons/add-icon.svg";
import {v4 as uuidv4} from "uuid";
import {getRandomColor} from "../../common/Util";
import NextIcon from "../../assets/icons/next.svg"
import PrevIcon from "../../assets/icons/prev.svg"

const MAX_COLUMNS = 6

export const TeamBoardEditView: React.FC = () => {
    const { teamId } = useParams<{teamId: string}>()
    const navigate = useNavigate()
    const [board, setBoard] = useState<Board>()
    if (!teamId) {
        return <Navigate to={"/"}/>
    }

    useEffect(() => {
        getBoard(teamId)
            .then(board => setBoard(board))
    }, [teamId])

    if (!board) {
        return <div>
            loading
        </div>
    }

    const onAddColumn = () => {
        const column: BoardColumn = {
            id: uuidv4(),
            color: getRandomColor(),
            name: "",
            order: board.columns.length
        };

        setBoard({...board, columns: [...board.columns, column]});
    }

    const onChangeColumn = (id: string, column: BoardColumn) => {
        const columnIndex = board.columns.findIndex((col) => col.id === id);

        const newColumns = [...board.columns]
        newColumns[columnIndex] = column

        setBoard({...board, columns: newColumns})
    }

    const onChangeOrder = (from: number, action: 'next' | 'prev') => {
        const newColumns = [...board.columns]
        const to = action === 'next' ? from + 1 : from - 1
        const fromIndex = newColumns.findIndex((col) => col.order === from)
        const toIndex = newColumns.findIndex((col) => col.order === to)

        newColumns[fromIndex].order = to
        newColumns[toIndex].order = from

        setBoard({...board, columns: newColumns})
    }

    const onChangeDefaultColumn = (id: string) => {
        setBoard({...board, defaultColumnId: id})
    }

    const onDeleteColumn = (id: string) => {
        if (board.defaultColumnId === id) {
            return
        }

        const columnIndex = board.columns.findIndex((col) => col.id === id);
        const newColumns = [...board.columns]

        newColumns.splice(columnIndex, 1)

        setBoard({...board, columns: newColumns})
    }

    const saveBoard = () => {
        editBoard(teamId, board)
            .then(() => {
                navigate(`/team/${teamId}/board`)
            })
            .catch(console.log)
    }

    return (
        <>
            <Navbar>
                <HeaderBar text={`Edycja tablicy zadań`}/>
                <Button className={styles.action} size={"small"} onClick={saveBoard}>
                    Zapisz
                </Button>
            </Navbar>

            <div className={styles.container}>
                <div className={styles.columns}>
                    {board.columns.sort((a, b) => a.order - b.order).map((col, index) =>
                        <div key={col.id}>
                            <ColumnCreate
                                color={col.color}
                                name={col.name}
                                desc={""}
                                onChange={({color, name}) => onChangeColumn(col.id, {
                                    id: col.id,
                                    name: name,
                                    color: color,
                                    order: index,
                                })}
                                onDelete={() => onDeleteColumn(col.id)}
                            />

                            <div onClick={() => onChangeDefaultColumn(col.id)} className={styles.columnAction}>
                                {index !== 0 &&
                                    <PrevIcon
                                        style={{cursor: 'pointer'}}
                                        width={32}
                                        height={32}
                                        onClick={() => onChangeOrder(index, 'prev')}/>
                                }

                                {index !== board.columns.length - 1 &&
                                    <NextIcon
                                        style={{cursor: 'pointer'}}
                                        width={32}
                                        height={32}
                                        onClick={() => onChangeOrder(index, 'next')}/>
                                }

                                <input
                                    type={"radio"}
                                    name={"default"}
                                    value={col.id}
                                    checked={board.defaultColumnId === col.id}/>
                                <span>Domyślna</span>
                            </div>
                        </div>
                    )}

                    <div className={styles.columnButton}>
                        <Button disabled={board.columns.length >= MAX_COLUMNS} size="big" onClick={onAddColumn}>
                            <span>Nowa Kolumna</span>
                            <AddIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
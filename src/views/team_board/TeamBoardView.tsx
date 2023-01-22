import React, {useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router";
import Navbar from "../../component/navbar/Navbar";
import {HeaderBar} from "../../component/header_bar/HeaderBar";
import styles from "./TeamBoardView.module.scss";
import {Button} from "../../component/button/Button";
import {Board} from "../../interfaces/Board.interface";
import {getBoard} from "../../api/team/Team.service";
import {Column} from "../../component/column/Column";

export const TeamBoardView: React.FC = () => {
    const { teamId } = useParams<{teamId: string}>();
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

    const onEditClick = () => {
        navigate("edit")
    }

    return (
        <>
            <Navbar>
                <HeaderBar text={`Tablica zadań`}/>
                <Button className={styles.toolbarAction} size={"small"} onClick={onEditClick}>
                    Edytuj
                </Button>
            </Navbar>

            <div className={styles.container}>
                {board?.columns?.sort((a, b) => a.order - b.order).map(col =>
                    <Column
                        key={col.id}
                        headerStyle={styles.headerStyle}
                        columnData={{
                            name: col.name,
                            color: col.color,
                            description: null
                        }}>

                    </Column>
                )}
            </div>
        </>
    )
}
import React from "react";
import {useNavigate} from "react-router";
import Navbar from "../../component/navbar/Navbar";
import {HeaderBar} from "../../component/header_bar/HeaderBar";
import styles from "./TeamBoardView.module.scss";
import {Button} from "../../component/button/Button";
import {Column} from "../../component/column/Column";
import {ColumnCardContainer} from "../../component/dragndrop/ColumnCardContainer";
import {DraggableCard} from "../../component/dragndrop/DraggableCard";
import {Card} from "../../component/card/Card";
import {useBoard} from "../../context/board/BoardContext.hook";

export const TeamBoardView: React.FC = () => {
    const {board, teamUsers, moveTask, changeTaskOwner} = useBoard()
    const navigate = useNavigate()

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
                {board.columns?.sort((a, b) => a.order - b.order).map(column =>
                    <Column
                        key={column.id}
                        headerStyle={styles.headerStyle}
                        columnData={{
                            name: column.name,
                            color: column.color,
                            description: null
                        }}>
                        <ColumnCardContainer
                            columnId={column.id}
                            onCardDropped={(taskId) => moveTask(taskId, column.id)}>
                            {board.tasks.filter(task => task.columnId === column.id).map(task => {
                                const author = teamUsers.find((user) => user.user_id === task.ownerId);

                                return (
                                    <DraggableCard
                                        key={task.id}
                                        parentCardId={null}
                                        cardId={task.id}
                                        columnId={column.id}>
                                        <Card
                                            text={task.text}
                                            author={{
                                                avatar_link: author?.avatar_link || "",
                                                name: author?.nick || "",
                                                id: task.ownerId,
                                            }}
                                            teamUsers={teamUsers}
                                            editable
                                            onChangeOwner={(newOwnerId) => changeTaskOwner(task.id, newOwnerId)}
                                        />
                                    </DraggableCard>
                                )
                            })}
                        </ColumnCardContainer>
                    </Column>
                )}
            </div>
        </>
    )
}
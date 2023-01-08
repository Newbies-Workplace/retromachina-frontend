import {useRetro} from "../../../context/RetroContext.hook"
import styles from "./ReflectionView.module.scss"
import {Column} from "../../../component/column/Column"
import DeleteIconSvg from "../../../assets/icons/delete-icon.svg"
import { useUser } from "../../../context/UserContext.hook"
import React from "react";
import {ColumnInput} from "../../../component/column/ColumnInput";
import {Card} from "../../../component/card/Card";

export const ReflectionView: React.FC = () => {
    const {user} = useUser();
    const {teamUsers, columns, cards, setWriting, createCard, deleteCard} = useRetro()

    return (
        <div className={styles.container}>
            {columns?.map((column) => {
                const columnCards = cards.filter(c => c.columnId === column.id)

                return (
                    <Column
                        key={column.id}
                        columnData={column}>

                        <ColumnInput
                            columnData={column}
                            onCardCreated={(value) => {
                                createCard(value, column.id)
                            }}
                            onIsWriting={(value) => {
                                setWriting(value, column.id);
                            }}/>

                        {columnCards?.filter((card) => card.authorId === user?.user_id).map((card) => {
                            const user = teamUsers.find((user) => user.user_id === card.authorId);

                            return (
                                <Card
                                    key={card.id}
                                    text={card.text}
                                    author={{
                                        avatar_link: user?.avatar_link || "",
                                        name: user?.nick || "",
                                        id: card.authorId,
                                    }}
                                    teamUsers={teamUsers}
                                >
                                    <DeleteIconSvg style={{cursor: "pointer"}} onClick={() => deleteCard(card.id)}/>
                                </Card>
                            );
                        })}
                    </Column>
                )
            })}
        </div>
    );
}


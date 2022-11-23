import {useRetro} from "../../../context/RetroContext.hook"
import styles from "./GroupView.module.scss"
import {Column} from "../../../component/column/Column"
import React from "react";
import {Card} from "../../../component/card/Card";
import {ColumnCardContainer} from "../../../component/column/ColumnCardContainer";

export const GroupView: React.FC = () => {
    const {teamUsers, columns, cards} = useRetro()

    return (
        <div className={styles.container}>
            {columns?.map((column) => {
                const columnCards = cards.filter(c => c.columnId === column.id)

                return (
                    <Column
                        key={column.id}
                        columnData={column}
                    >

                        <ColumnCardContainer columnId={column.id} onCardDropped={(cardId) => {
                            console.log(`Card ${cardId} dropped onto ${column.id} column`)
                        }}>

                            {columnCards?.map((card) => {
                                const user = teamUsers.find((user) => user.user_id === card.authorId);

                                return (
                                    <Card
                                        id={card.id}
                                        key={card.id}
                                        text={card.text}
                                        author={{
                                            avatar_link: user?.avatar_link || "",
                                            name: user?.nick || "",
                                            id: card.authorId,
                                        }}
                                        teamUsers={teamUsers}
                                    />
                                );
                            })}
                        </ColumnCardContainer>
                    </Column>
                )
            })}
        </div>
    );
}


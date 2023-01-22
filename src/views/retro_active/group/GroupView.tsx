import {useRetro} from "../../../context/RetroContext.hook"
import styles from "./GroupView.module.scss"
import {Column} from "../../../component/column/Column"
import React from "react";
import {Card} from "../../../component/card/Card";
import {ColumnCardContainer} from "../../../component/dragndrop/ColumnCardContainer";
import {DraggableCard} from "../../../component/dragndrop/DraggableCard";
import {GroupCardContainer} from "../../../component/dragndrop/GroupCardContainer";

export const GroupView: React.FC = () => {
    const {teamUsers, columns, cards, moveCard} = useRetro()

    return (
        <div className={styles.container}>
            {columns?.map((column) => {
                const columnCards = cards.filter(c => c.columnId === column.id)

                return (
                    <Column
                        key={column.id}
                        columnData={{
                            color: column.color,
                            name: column.name,
                            description: column.desc,
                        }}>
                        <ColumnCardContainer
                            columnId={column.id}
                            onCardDropped={(cardId) => moveCard({
                                targetType: 'column',
                                cardId: cardId,
                                targetId: column.id
                            })}>
                            {columnCards.filter(c => c.parentCardId === null).map(group => {
                                const groupCards = [group, ...cards.filter(c => c.parentCardId === group.id)]
                                return (
                                    <GroupCardContainer
                                        key={group.id}
                                        parentCardId={group.id}
                                        onCardDropped={(cardId) => moveCard({
                                            targetType: 'card',
                                            cardId: cardId,
                                            targetId: group.id,
                                        })}>
                                        {groupCards.map((card, index) => {
                                            const user = teamUsers.find((user) => user.user_id === card.authorId);

                                            return (
                                                <DraggableCard
                                                    key={card.id}
                                                    parentCardId={card.parentCardId}
                                                    cardId={card.id}
                                                    columnId={column.id}
                                                    style={{marginTop: index === 0 ? 0 : -80}}>
                                                    <Card
                                                        text={card.text}
                                                        author={{
                                                            avatar_link: user?.avatar_link || "",
                                                            name: user?.nick || "",
                                                            id: card.authorId,
                                                        }}
                                                        teamUsers={teamUsers}
                                                    />
                                                </DraggableCard>
                                            )
                                        })}
                                    </GroupCardContainer>
                                );
                            })}
                        </ColumnCardContainer>
                    </Column>
                )
            })}
        </div>
    );
}


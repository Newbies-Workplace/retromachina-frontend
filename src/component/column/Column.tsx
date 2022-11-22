import React, {useEffect, useState} from "react";
import { SocketCard, SocketColumn } from "../../api/socket/Socket.events";
import { UserResponse } from "../../api/user/User.interfaces";
import { Card } from "../card/Card";
import { CardCount } from "../card_indicator/CardIndicator";
import { ColumnHeader } from "../column_header/ColumnHeader";
import { Input } from "../input/Input";
import styles from "./Column.module.scss";

interface ColumnProps {
    columnData: SocketColumn,
    cards: SocketCard[],
    onCardCreated: (text: string) => void
    onIsWriting: (value: boolean) => void
    users: UserResponse[]
}

export const Column: React.FC<ColumnProps> = (
    {
        columnData,
        cards,
        onCardCreated,
        onIsWriting,
        users
    }
) => {
    const [value, setValue] = useState("");
    const onStopWriting = () => {
        if (columnData.isWriting) {
            onIsWriting(false)
        }
    }

    useEffect(() => {
        if (value !== "" && !columnData.isWriting) {
            onIsWriting(true)
        }
        const timeout = setTimeout(onStopWriting, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return (
        <div className={styles.column}>
            <div className={styles.cardWrapper}>
                <ColumnHeader
                    color={columnData.color}
                    header={columnData.name}
                    description={columnData.desc ?? undefined} />

                <Input
                    value={value}
                    setValue={setValue}
                    multiline={true}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            onCardCreated(value);
                            setValue("");
                        }
                    }} />

                <CardCount
                    isWritting={columnData.isWriting}
                    count={columnData.teamCardsAmount} />

                {cards?.map((card) => {
                    const user = users.find((user) => user.user_id === card.authorId);

                    return (
                        <Card
                            key={card.id}
                            text={card.text}
                            author={{
                                avatar_link: user?.avatar_link || "",
                                name: user?.nick || "",
                                id: card.authorId,
                            }}
                            teamUsers={users}
                        />
                    );
                })}
            </div>
        </div>
    );
};

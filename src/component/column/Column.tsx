import { useState } from "react";
import { SocketCard, SocketColumn } from "../../api/socket/Socket.events";
import { UserResponse } from "../../api/user/User.interfaces";
import { Card } from "../card/Card";
import { CardCount } from "../card_indicator/CardIndicator";
import { ColumnHeader } from "../column_header/ColumnHeader";
import { Input } from "../input/Input";
import styles from "./Column.module.scss";


interface ColumnProps {
    onCardCreated: (text: string) => void
    onIsWriting?: (value: boolean) => void //TODO: zmienić na wymagane
    isWriting: boolean,
    usersWriting: boolean,
    columnData: SocketColumn,
    users: UserResponse[]
}

export const Column: React.FC<ColumnProps> = ({onCardCreated, onIsWriting, isWriting, usersWriting, columnData, users}) => {
  const [value, setValue] = useState("");
    

  return (
    <>
      <div className={styles.column}>
        <div className={styles.cardWrapper}>
          <ColumnHeader
            color={columnData.color}
            withDescription={columnData.desc !== null}
            header={columnData.name}
          >
            {columnData.desc}
          </ColumnHeader>
          <Input
            value={value}
            setValue={(value) => {
                //TODO:
                //dodać logike do animacji pisania
                setValue(value);
            }}
            multiline={true}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setValue("");
                    onCardCreated(value);
                }
            }}
          />
          <CardCount isWritting={usersWriting || isWriting} count={columnData.teamCardsAmount} />
          {columnData.cards?.map(({ text, authorId }) => {
            const user = users.find((user) => user.id === authorId);
            return (
              <Card
                text={text}
                author={{
                  avatar_link: user?.avatar_link || "",
                  name: user?.nick || "",
                  id: authorId,
                }}
                teamUsers={users}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

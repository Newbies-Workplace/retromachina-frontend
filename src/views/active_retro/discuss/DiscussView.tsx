import React, { useState } from "react"
import { Card } from "../../../component/card/Card"
import { Input } from "../../../component/input/Input"
import { useRetro } from "../../../context/RetroContext.hook"
import styles from "./DiscussView.module.scss"
import DeleteIconSvg from "../../../assets/icons/delete-icon.svg";
import {useUser} from "../../../context/UserContext.hook";

export const DiscussView = () => {
    const {cards, teamUsers, createActionPoint, deleteActionPoint, actionPoints, changeActionPointOwner} = useRetro()
    const [value, setValue] = useState("")
    const {user} = useUser()

    return  (
        <div className={styles.container}>
            <div className={styles.nextCardWrapper}>
                <span className={styles.header}>Już za chwilę...</span>
                {
                    cards.map((card)=>{
                        const author = teamUsers.find((user) => user.user_id === card.authorId);
                        return(
                            <Card
                                id={card.id}
                                key={card.id}
                                text={card.text}
                                author={{
                                    avatar_link: author?.avatar_link || "",
                                    name: author?.nick || "",
                                    id: card.authorId,
                                }}
                                teamUsers={teamUsers}
                            />
                        )
                    })
                }
            </div>
            <div className={styles.currentCardWrapper}>

            </div>
            <div className={styles.actionPointWrapper}>
                <div className={styles.actionCardWrapper}>
                    {actionPoints?.map((actionPoint)=>{
                        const author = teamUsers.find((teamUser) => teamUser.user_id === actionPoint.ownerId)
                        return (
                            <Card
                                style={{marginBottom: 16}}
                                editable
                                onChangeOwner={(newOwnerId) => {
                                    changeActionPointOwner(actionPoint.id, newOwnerId)
                                }}
                                teamUsers={teamUsers}
                                id={actionPoint.id}
                                key={actionPoint.id}
                                text={actionPoint.text}
                                author={{
                                    avatar_link: author?.avatar_link || "",
                                    name: author?.nick || "",
                                    id: author?.user_id || "",
                                }}>
                                <DeleteIconSvg style={{cursor: "pointer"}} onClick={() => deleteActionPoint(actionPoint.id)}/>
                            </Card>
                        )
                    })}
                </div>
                <div className={styles.actionCardInput}>
                    <Input
                        multiline
                        value={value}
                        setValue={setValue}
                        placeholder={"Nowy action point..."}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                createActionPoint(value, cards[0]?.authorId ?? user?.user_id!)
                                setValue("");
                            }
                        }}/>
                </div>
            </div>
        </div>
    )
}
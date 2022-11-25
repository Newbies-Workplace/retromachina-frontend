import { useState } from "react"
import { ActionPoint } from "../../../api/socket/Socket.events"
import { Card } from "../../../component/card/Card"
import { Input } from "../../../component/input/Input"
import { useRetro } from "../../../context/RetroContext.hook"
import styles from "./DiscussView.module.scss" 


export const DiscussView = () => {
    const {cards,teamUsers, createActionPoint, actionPoint} = useRetro()
    const [value,setValue] = useState("")
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
                {
                    actionPoint?.map(({id,ownerId,text,parentCardId}:ActionPoint)=>{
                        const author = teamUsers.find((u)=>u.user_id===ownerId)
                        return(
                            <Card editable teamUsers={teamUsers} id={id} text={text} author={{
                                avatar_link: author?.avatar_link || "",
                                name: author?.nick || "",
                                id: author?.user_id || "",
                            }} />
                        )
                    })
                }
                </div>
                <div className={styles.inputWrapper}><Input  multiline value={value} setValue={setValue} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        console.log(value)
                        e.preventDefault()
                        createActionPoint(value,cards[0].authorId)
                        setValue("");
                    }
                }}></Input></div>
            </div>
        </div>
    )
}

function onCardCreated(value: string) {
    throw new Error("Function not implemented.")
}

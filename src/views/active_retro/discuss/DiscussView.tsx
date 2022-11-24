import { useState } from "react"
import { Card } from "../../../component/card/Card"
import { Input } from "../../../component/input/Input"
import { useRetro } from "../../../context/RetroContext.hook"
import styles from "./DiscussView.module.scss" 


export const DiscussView = () => {
    const {cards,teamUsers} = useRetro()
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
            <div className={styles.currentCardWrapper}></div>
            <div className={styles.actionPointWrapper}>
                <div className={styles.actionCardWrapper}></div>
                <div className={styles.inputWrapper}><Input  multiline value={value} setValue={setValue}></Input></div>
            </div>
        </div>
    )
}
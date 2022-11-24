import { useEffect, useState } from "react"
import { Card } from "../../../component/card/Card"
import Counter from "../../../component/card/counter/Counter"
import { Column } from "../../../component/column/Column"
import { useRetro } from "../../../context/RetroContext.hook"
import { useUser } from "../../../context/UserContext.hook"
import styles from "./VoteView.module.scss"

export const VoteView = () => {
    const {columns,cards,teamUsers,votes,maxVotes,addVote,removeVote} = useRetro()
    const {user} = useUser()
    
    const votesLeft = maxVotes - votes.filter((vote) => {user?.user_id === vote.voterId }).length    
    
    
   
    return(
        <div className={styles.container}>
            {columns?.map((column) => {
                return(
                    <Column
                        key={column.id}
                        columnData={column}
                    >
                        {cards?.filter((card)=>card.columnId==column.id).map((card) => {
                                const user = teamUsers.find((user) => user.user_id === card.authorId);
                                const userVotes = votes.filter((vote) => user?.user_id === vote.voterId && vote.parentCardId === card.id ).length
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
                                    >
                                       <Counter canIncrement={votesLeft>0} count={userVotes} onIncrement={()=>{addVote(card.id)}} onDecrement={()=>{removeVote(card.id)}} />
                                    </Card>
                                );
                            })}
                    </Column>
                )
            })}
        </div>
    )
}
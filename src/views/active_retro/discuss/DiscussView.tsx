import React, { useEffect, useState } from "react"
import { Card } from "../../../component/card/Card"
import { Input } from "../../../component/input/Input"
import { useRetro } from "../../../context/RetroContext.hook"
import styles from "./DiscussView.module.scss"
import DeleteIconSvg from "../../../assets/icons/delete-icon.svg";
import { useUser } from "../../../context/UserContext.hook";
import { SocketCard } from "../../../api/socket/Socket.events";

interface Group {
    votes: number
    cards: SocketCard[]
}

export const DiscussView = () => {
    const { cards, teamUsers, votes, createActionPoint, deleteActionPoint, actionPoints, changeActionPointOwner, discussionCardId } = useRetro();
    const [discussionCard, setDiscussionCard] = useState<SocketCard | null>(null);
    const [value, setValue] = useState("")
    const { user, isScrumMaster } = useUser()
    const [groups, setGroups] = useState<Group[]>([])

    useEffect(() => {
        setGroups(cards.filter(c => c.parentCardId === null)
            .map(parent => {
                const groupCards = [parent, ...cards.filter(c => c.parentCardId === parent.id)]
                const count = groupCards.map((c) => votes.filter(v => v.parentCardId === c.id).length)
                    .reduce((a, c) => a + c, 0)

                return {
                    cards: groupCards,
                    votes: count
                }
            }))
    }, [cards, votes])

    useEffect(() => {
        console.log(discussionCard, discussionCardId);
        console.log(cards)
        setDiscussionCard(cards.find((card) => card.id === discussionCardId) || null);
    }, [discussionCardId]);

    return (
        <div className={styles.container}>
            <div className={styles.nextCardWrapper}>
                <span className={styles.header}>Już za chwilę...</span>
                {groups.sort((a, b) => (b.votes - a.votes)).map(group => {
                    return (
                        <>
                            {group.cards.map((card, index) => {
                                const author = teamUsers.find((user) => user.user_id === card.authorId);

                                return (
                                    <Card
                                        key={card.id}
                                        style={{ marginTop: index === 0 ? 0 : -80 }}
                                        id={card.id}
                                        text={card.text}
                                        author={{
                                            avatar_link: author?.avatar_link || "",
                                            name: author?.nick || "",
                                            id: card.authorId,
                                        }}
                                        teamUsers={teamUsers}
                                    >
                                        {group.cards.length === index + 1 &&
                                            <span style={{ alignSelf: 'center' }}>{group.votes}</span>
                                        }
                                    </Card>
                                )
                            })}
                        </>
                    )
                })}
            </div>
            {discussionCardId &&
                <div className={styles.currentCardWrapper}>
                    <div className={styles.discussCard}>
                        {discussionCard?.text}
                    </div>
                </div>
            }
            <div className={styles.actionPointWrapper}>
                <div className={styles.actionCardWrapper}>
                    {actionPoints?.filter((actionPoint) => actionPoint.parentCardId === discussionCardId).map((actionPoint) => {
                        const author = teamUsers.find((teamUser) => teamUser.user_id === actionPoint.ownerId)
                        return (
                            <Card
                                style={{ marginBottom: 16 }}
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
                                <DeleteIconSvg
                                    style={{cursor: "pointer"}}
                                    onClick={() => deleteActionPoint(actionPoint.id)}/>
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
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                createActionPoint(value, user?.user_id!)
                                setValue("");
                            }
                        }} />
                </div>
            </div>
        </div>
    )
}
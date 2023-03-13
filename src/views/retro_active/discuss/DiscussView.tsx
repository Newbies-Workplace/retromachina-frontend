import React, {useEffect, useState} from "react"
import {Card} from "../../../component/card/Card"
import {Input} from "../../../component/input/Input"
import {useRetro} from "../../../context/retro/RetroContext.hook"
import styles from "./DiscussView.module.scss"
import DeleteIconSvg from "../../../assets/icons/delete-icon.svg";
import {useUser} from "../../../context/UserContext.hook";
import {Group, useCardGroups} from "../../../context/useCardGroups";
import {Avatar} from "../../../component/avatar/Avatar";
import {usePlural} from "../../../context/usePlural";
import {GroupCardContainer} from "../../../component/dragndrop/group_card_container/GroupCardContainer";

export const DiscussView = () => {
    const {
        cards,
        teamUsers,
        votes,
        createActionPoint,
        deleteActionPoint,
        actionPoints,
        changeActionPointOwner,
        discussionCardId,
    } = useRetro();
    const [value, setValue] = useState("")
    const { user } = useUser()
    const [groups, setGroups] = useState<Group[]>([])

    useEffect(() => {
        setGroups(useCardGroups(cards, votes))
    }, [cards, votes])

    return (
        <div className={styles.container}>
            <div className={styles.nextCardWrapper}>
                <span className={styles.header}>Już za chwilę...</span>
                {groups.sort((a, b) => (b.votes - a.votes))
                    .filter((group, groupIndex) => {
                        const discussIndex = groups.findIndex(g => g.parentCardId === discussionCardId)
                        return discussIndex < groupIndex
                    })
                    .map(group => {
                        return (
                            <GroupCardContainer
                                key={group.parentCardId}
                                parentCardId={group.parentCardId}
                                onCardDropped={() => {}}
                            >
                                {group.cards.map((card, index) => {
                                    const author = teamUsers.find((user) => user.user_id === card.authorId);

                                    return (
                                        <Card
                                            key={card.id}
                                            style={{ marginTop: index === 0 ? 0 : -80 }}
                                            text={card.text}
                                            author={{
                                                avatar_link: author?.avatar_link || "",
                                                name: author?.nick || "",
                                                id: card.authorId,
                                            }}
                                            teamUsers={teamUsers}
                                        >
                                            {group.cards.length === index + 1 &&
                                                <span className={styles.votes}>
                                                {group.votes}
                                            </span>
                                            }
                                        </Card>
                                    )
                                })}
                            </GroupCardContainer>
                        )
                    })}
            </div>

            {discussionCardId &&
                <div className={styles.currentCardWrapper}>
                    {(() => {
                        const group = groups.find(g => g.parentCardId === discussionCardId)!
                        if (!group) {
                            return null
                        }

                        return (
                            <div className={styles.discussCardWrapper}>
                                {group.cards.map(card => {
                                    const author = teamUsers.find(u => u.user_id === card.authorId)

                                    return (
                                        <div key={card.id} className={styles.card}>
                                            <Avatar url={author?.avatar_link ?? ""} size={24}/>

                                            {card.text}
                                        </div>
                                    )
                                })}

                                <span className={styles.groupVotes}>
                                    {group.votes} {usePlural(group.votes, {one: "głos", few: "głosy", other: "głosów"})}
                                </span>
                            </div>
                        )
                    })()}
                </div>
            }

            <div className={styles.actionPointWrapper}>
                <div className={styles.actionCardWrapper}>
                    {actionPoints?.filter((actionPoint) => actionPoint.parentCardId === discussionCardId)
                        .map((actionPoint) => {
                            const author = teamUsers.find((teamUser) => teamUser.user_id === actionPoint.ownerId)
                            return (
                                <Card
                                    key={actionPoint.id}
                                    style={{ marginBottom: 16 }}
                                    editable
                                    onChangeOwner={(newOwnerId) => {
                                        changeActionPointOwner(actionPoint.id, newOwnerId)
                                    }}
                                    teamUsers={teamUsers}
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
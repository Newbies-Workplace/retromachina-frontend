import React, { useCallback, useRef, useState } from "react";
import styles from "./Card.module.scss"
import {Avatar} from "../avatar/Avatar"
import {UserResponse} from "../../api/user/User.interfaces";
import EditIconSvg from "../../assets/icons/edit-icon.svg"
import useClickOutside from "../../context/useClickOutside";

import { useUser } from "../../context/UserContext.hook";
import { useRetro } from "../../context/RetroContext.hook";
import {User} from "../../interfaces/User.interface";

export interface CardProps {
    style?: React.CSSProperties
    id: string
    text: string
    author?: {
        avatar_link: string
        name: string
        id: string
    }
    teamUsers: UserResponse[]
    editable?: boolean
    onChangeOwner?: (newOwnerId: string) => void
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({id, style,  children ,  text , author , teamUsers , editable= false, onChangeOwner}) => {
    const [isUsersOpen, setUsersOpen] = useState(false);

    const close = useCallback(() => setUsersOpen(false), []);
    const popover = useRef<any>();
    useClickOutside(popover, close);

    return (
        <div style={style} className={styles.wrapper}>
            <div className={styles.content}>
                <span className={styles.text}>{text}</span>
                {author &&
                    <div className={styles.creator}>
                        <div style={{position: 'relative'}}>
                            {isUsersOpen && teamUsers.length > 1 &&
                                <div className={styles.bubbleContainer} ref={popover}>
                                    <TeamUserPicker
                                        authorId={author.id}
                                        teamUsers={teamUsers}
                                        onUserPicked={(userId) => {
                                            onChangeOwner?.(userId)
                                            setUsersOpen(false)
                                        }}/>
                                </div>
                            }
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                cursor: editable ? 'pointer' : 'default'
                            }}
                            onClick={() => {
                                if (editable) {
                                    setUsersOpen(true)
                                }
                            }}>
                            <Avatar isActive={false} url={author.avatar_link}/>
                            <span>{author.name}</span>
                            {editable && <EditIconSvg/>}
                        </div>
                    </div>
                }
            </div>
            <div className={styles.childrenWrapper}>
                {children}
            </div>
        </div>
    )
}

interface TeamUserPickerProps {
    authorId: string,
    teamUsers: UserResponse[],
    onUserPicked: (userId: string) => void
}

const TeamUserPicker: React.FC<TeamUserPickerProps> = ({teamUsers, authorId, onUserPicked}) => {
    return (
        <>
            {teamUsers?.filter(user => user.user_id !== authorId).map(user => {
                return (
                    <div key={user.user_id} className={styles.userWrapper} onClick={() => {onUserPicked(user.user_id)}}>
                        <Avatar isActive={false} url={user.avatar_link}/>
                        <span>{user.nick}</span>
                    </div>
                )
            })}
        </>
    )
}
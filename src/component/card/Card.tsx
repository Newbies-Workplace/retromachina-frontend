import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./Card.module.scss"
import {Avatar} from "../avatar/Avatar"
import {UserResponse} from "../../api/user/User.interfaces";
import EditIconSvg from "../../assets/icons/edit-icon.svg"
import SaveIcon from "../../assets/icons/save.svg"
import useClickOutside from "../../context/useClickOutside";
import cs from "classnames";
import {Button} from "../button/Button";

export interface CardProps {
    style?: React.CSSProperties
    className?: string
    text: string
    author?: {
        avatar_link: string
        name: string
        id: string
    }
    teamUsers: UserResponse[]
    editableUser?: boolean
    editableText?: boolean
    onUpdate?: (ownerId: string, text: string) => void
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = (
    {
        className,
        style,
        children ,
        text ,
        author ,
        teamUsers ,
        editableUser = false,
        editableText = false,
        onUpdate
    }
) => {
    const [isUsersOpen, setUsersOpen] = useState(false)
    const [isEditingText, setIsEditingText] = useState(false)
    const [editingText, setEditingText] = useState(text)

    const closeUserPickerPopover = useCallback(() => {
        setUsersOpen(false)
    }, [])
    const closeEditingMode = useCallback(() => {
        setIsEditingText(false)
        setEditingText(text)
    }, [text])
    const popover = useRef<any>()
    const textarea = useRef<any>()

    useClickOutside(popover, closeUserPickerPopover)
    useClickOutside(textarea, closeEditingMode)

    useEffect(() => {
        setEditingText(text)
    }, [text])

    const onTextClick = () => {
        if (editableText) {
            setIsEditingText(true)
        }
    }

    const onSaveClick = () => {
        if (!author) {
            return
        }
        onUpdate?.(author.id, editingText.trim())
        setIsEditingText(false)
    }

    return (
        <div style={style} className={cs(styles.wrapper, className)}>
            <div className={styles.content}>
                {isEditingText
                    ? <textarea
                        className={cs(styles.text, styles.input)}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        ref={textarea}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                onSaveClick()
                            }
                        }}
                        onFocus={(e) => {
                            // workaround for focus at line end
                            const temp = e.target.value
                            e.target.value = ''
                            e.target.value = temp
                        }}
                    />
                    : <span className={styles.text} onClick={onTextClick}>
                        {text}
                    </span>
                }

                {author &&
                    <div className={styles.creator}>
                        <div style={{position: 'relative'}}>
                            {isUsersOpen && teamUsers.length > 1 &&
                                <div className={styles.bubbleContainer} ref={popover}>
                                    <TeamUserPicker
                                        authorId={author.id}
                                        teamUsers={teamUsers}
                                        onUserPicked={(userId) => {
                                            onUpdate?.(userId, text)
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
                                cursor: editableUser ? 'pointer' : 'default'
                            }}
                            onClick={() => {
                                if (editableUser) {
                                    setUsersOpen(true)
                                }
                            }}>
                            <Avatar url={author.avatar_link} size={24}/>
                            <span>{author.name}</span>
                            {editableUser &&
                                <EditIconSvg width={12} height={12}/>
                            }
                        </div>
                    </div>
                }
            </div>
            <div className={styles.childrenWrapper}>
                {isEditingText
                    ? <Button size={'round'} onClick={onSaveClick}>
                        <SaveIcon/>
                    </Button>
                    : children
                }
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
                        <Avatar url={user.avatar_link} size={24} />

                        <span>{user.nick}</span>
                    </div>
                )
            })}
        </>
    )
}
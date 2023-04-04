import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./Card.module.scss"
import {Avatar} from "../avatar/Avatar"
import {UserResponse} from "../../api/user/User.interfaces";
import EditIconSvg from "../../assets/icons/edit-icon.svg"
import SaveIcon from "../../assets/icons/save.svg"
import cs from "classnames";
import {Button} from "../button/Button";
import {PositioningBackdrop} from "../backdrop/PositioningBackdrop";
import useClickOutside from "../../context/useClickOutside";

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
    autoFocus?: boolean
    onUpdate?: (ownerId: string, text: string) => void
    onEditDismiss?: () => void
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
        autoFocus = false,
        onUpdate,
        onEditDismiss,
    }
) => {
    const teamUsersRef = useRef<any>()
    const [isUsersOpen, setUsersOpen] = useState(false)
    const [isEditingText, setIsEditingText] = useState(autoFocus)
    const [editingText, setEditingText] = useState(text)

    const closeUserPickerPopover = useCallback(() => {
        setUsersOpen(false)
    }, [])

    const closeEditingMode = useCallback(() => {
        setIsEditingText(false)
        setUsersOpen(false)
        setEditingText(text)
        onEditDismiss?.()
    }, [text])

    useEffect(() => {
        setEditingText(text)
    }, [text])

    useClickOutside(teamUsersRef, closeUserPickerPopover)

    const onTextClick = () => {
        if (editableText) {
            setIsEditingText(true)
        }
    }

    const onChangeUser = (userId: string) => {
        onUpdate?.(userId, text)
        setUsersOpen(false)
    }

    const onSaveClick = () => {
        if (!author) {
            return
        }
        onUpdate?.(author.id, editingText.trim())
        setIsEditingText(false)
    }

    return (
        <PositioningBackdrop onDismiss={() => closeEditingMode()} visible={isEditingText || isUsersOpen}>
            <div style={style} className={cs(styles.wrapper, className)}>
                <div className={styles.content}>
                    {isEditingText
                        ? <textarea
                            className={cs(styles.text, styles.input)}
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
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
                            }} />
                        : <span className={styles.text} onClick={onTextClick}>{text}</span>
                    }

                    {author &&
                        <div className={styles.creator}>
                            <div style={{position: 'relative'}}>
                                {isUsersOpen && teamUsers.length > 1 &&
                                    <div className={styles.bubbleContainer} ref={teamUsersRef}>
                                        <TeamUserPicker
                                            authorId={author?.id || ''}
                                            teamUsers={teamUsers}
                                            onUserPicked={(userId) => onChangeUser(userId)}/>
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
                                {editableUser && <EditIconSvg width={12} height={12}/>}
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
        </PositioningBackdrop>
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
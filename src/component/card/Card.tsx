import React, { useCallback, useRef, useState } from "react";
import styles from "./Card.module.scss"
import {Avatar} from "../avatar/Avatar"
import {UserResponse} from "../../api/user/User.interfaces";
import EditIconSvg from "../../assets/icons/edit-icon.svg"
import useClickOutside from "../../context/useClickOutside";

import { useUser } from "../../context/UserContext.hook";
import { useRetro } from "../../context/RetroContext.hook";

export interface CardProps {
    id: string
    text: string
    author: {
        avatar_link: string
        name: string
        id: string
    } //id usera
    teamUsers: UserResponse[]
    editable?: boolean
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({id , children ,  text , author , teamUsers , editable=false}) => {
    const popover = useRef<any>();
    const [isOpen, toggle] = useState(false);
    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);
    const {user} = useUser()
    const {onChangeOwner} = useRetro()
     
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.text}>
                    {text}
                </div>
                <div className={styles.creator}>
                    <Avatar isActive={false} url={author.avatar_link}/>
                    <span>{author.name}</span>
                    {
                     
                        editable && <EditIconSvg style={{marginLeft: "8px",cursor: "pointer"}} onClick={()=>{toggle(true)}}/>
                     
                    }
                    {isOpen && teamUsers.length>1 &&
                        <div className={styles.bubbleContainer} ref={popover}>
                            {teamUsers?.filter((u)=>user?.user_id!==u.user_id).map((u)=>{
                                    return(
                                        <div className={styles.usersWrapper} onClick={()=>{onChangeOwner(id , u.user_id)}}>
                                            <Avatar isActive={false} url={u.avatar_link}/>
                                            <span>{u.nick}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            <div className={styles.childrenWrapper}>{children}</div>
        </div>
    )
}
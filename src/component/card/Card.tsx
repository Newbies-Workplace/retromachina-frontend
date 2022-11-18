import React from "react";
import styles from "./Card.module.scss"
import {Avatar} from "../avatar/Avatar"
import {User} from "../../interfaces/User.interface";

interface CardProps {
    text: string;
    author: User
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ children , text, author}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.text}>
                    {text}
                </div>
                <div className={styles.creator}>
                    <Avatar isActive={true} url={author.avatar_link}/>
                </div>
            </div>
            <div className={styles.childrenWrapper}>{children}</div>
        </div>
    )
}
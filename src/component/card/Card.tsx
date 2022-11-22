import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss"
import {Avatar} from "../avatar/Avatar"
import {User} from "../../interfaces/User.interface";
import { axiosInstance } from "../../api/AxiosInstance";
import { useUser } from "../../context/UserContext.hook";
import { UserResponse } from "../../api/user/User.interfaces";

export interface CardProps {
    text: string;
    author: {
        avatar_link: string
        name: string
        id: string
    } //id usera
    teamUsers: UserResponse[]
    editable?: boolean
}


export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ children , text , author , teamUsers , editable=false}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.text}>
                    {text}
                </div>
                <div className={styles.creator}>
                    <Avatar isActive={false} url={author.avatar_link}/>
                    <span>{author.name}</span>
                </div>
            </div>
            <div className={styles.childrenWrapper}>{children}</div>
        </div>
    )
}
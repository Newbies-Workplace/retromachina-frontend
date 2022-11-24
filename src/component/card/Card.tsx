import React, {useEffect, useRef, useState} from "react";
import styles from "./Card.module.scss"
import {Avatar} from "../avatar/Avatar"
import {User} from "../../interfaces/User.interface";
import { axiosInstance } from "../../api/AxiosInstance";
import { useUser } from "../../context/UserContext.hook";
import { UserResponse } from "../../api/user/User.interfaces";
import {useDrag} from "react-dnd";
import * as path from "path";
import {ItemTypes} from "../utils";

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

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ children , id,  text , author , teamUsers , editable=false}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {id: id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))
    const opacity = isDragging ? 0.25 : 1

    return (
        <div ref={drag} style={{opacity: opacity}} className={styles.wrapper}>
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
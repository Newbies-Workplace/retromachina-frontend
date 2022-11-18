import React from "react";
import styles from "./Card.module.scss"
import Avatar from "../avatar/Avatar"


interface CardProps {
    variant: "1"|"2";
    text: string;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ children , variant , text}) => {

    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.text}>
                    {text}
                </div>
                <div className={styles.creator}>
                    <Avatar isActive={true} url={"https://di.com.pl/pic/photo/Screen_Shot_2014_08_21_at_101244_AM_640x834_1408689031.png"}/>
                </div>
            </div>
            <div className={styles.childrenWrapper}>{children}</div>
        </div>
        </>
    )

}

export default Card 
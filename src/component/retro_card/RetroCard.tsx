import React from "react"
import styles from "./RetroCard.module.scss"

interface RetroCardProps{
    onClick(): void
}

export const RetroCard: React.FC<RetroCardProps> = ({onClick}) => {
    return(

        <div className={styles.wrapper} onClick={onClick}>
            Retro właśnie 
            trwa
        </div>

    )
}
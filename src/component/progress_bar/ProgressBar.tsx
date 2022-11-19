import React from "react"
import styles from './ProgressBar.module.scss'

export const ProgressBar = () => {
    return (
        <div className={styles.loadingWrapper}>          
            <div className={styles.loading}>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )  
}
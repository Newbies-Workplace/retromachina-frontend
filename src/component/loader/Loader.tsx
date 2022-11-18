import React from "react"
import styles from './Loader.module.scss'

export const Loader = () => {
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
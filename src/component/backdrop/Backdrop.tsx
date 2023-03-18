import React from "react";
import styles from "./Backdrop.module.scss"

interface BackdropProps {
    onDismiss: () => void
    children: React.ReactNode
}

export const Backdrop: React.FC<BackdropProps> = ({children, onDismiss}) => {
    return (
        <div className={styles.backdrop} onClick={onDismiss}>
            {children}
        </div>
    )
}
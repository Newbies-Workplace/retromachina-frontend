import React from "react";
import styles from "./HeaderBar.module.scss";

interface HeaderBarProps {
    text: string,
}

export const HeaderBar : React.FC <HeaderBarProps> = ({text}) => {
    return (
        <div className={styles.tile}>
            <div className={styles.text}>
                {text}
            </div>
        </div>
    );
}
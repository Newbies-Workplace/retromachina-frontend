import React from "react";
import styles from "./HeaderBar.module.scss";

interface HeaderBarProps {
    text: string,
    active?: Boolean
}

export const HeaderBar : React.FC <HeaderBarProps> = ({text, active = false}) => {
    return (
        <div className={styles.tile}> {text} </div>
    );
}
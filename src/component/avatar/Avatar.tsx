import styles from './Avatar.module.scss';
import React from 'react';
import cs from "classnames";

interface PropsCircle {
    className?: string
    style?: React.CSSProperties
    isActive: Boolean
    url: any
}

export const Avatar : React.FC<PropsCircle> = ({isActive, style, url, className}) => {
    return (
        <div
            className={cs(styles.circle, className)}
            style={{outlineColor: isActive ? "#23F138" : "#D9D9D9", ...style}}>
            <img src={url} className={styles.photo} />
        </div>
    );
}
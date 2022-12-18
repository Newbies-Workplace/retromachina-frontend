import styles from './Avatar.module.scss';
import React from 'react';

interface PropsCircle{
    isActive: Boolean,
    url: any
    style?: React.CSSProperties;
}

export const Avatar : React.FC<PropsCircle> =  ({isActive, url}) => {
    return (
        <div
            className={styles.circle}
            style={{outlineColor: isActive ? "#23F138" : "#D9D9D9"}}>
            <img src={url} className={styles.photo} />
        </div>
    );
}
import styles from './Avatar.module.scss';
import React from 'react';
import cs from "classnames";

interface AvatarProps {
    className?: string
    style?: React.CSSProperties
    inactive?: Boolean
    url: any
}

export const Avatar : React.FC<AvatarProps> = ({inactive = false, style, url, className}) => {
    return (
        <div
            style={style}
            className={cs(
                styles.circle, {
                    [styles.inactive]: inactive
                }, className
            )}>
            <img referrerPolicy="no-referrer" src={url} className={styles.photo} />
        </div>
    );
}
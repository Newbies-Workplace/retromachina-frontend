import styles from './Avatar.module.scss';
import React from 'react';
import cs from "classnames";

interface AvatarProps {
    className?: string
    size?: number
    style?: React.CSSProperties
    inactive?: Boolean
    url: any
}

export const Avatar : React.FC<AvatarProps> = (
    {
        inactive = false,
        size = 40,
        style,
        url,
        className,
    }
) => {
    return (
        <div
            style={style}
            className={cs(
                styles.circle, {
                    [styles.inactive]: inactive
                }, className
            )}>
            <img
                referrerPolicy="no-referrer"
                src={url}
                style={{
                    width: size,
                    height: size,
                    minWidth: size,
                    minHeight: size,
                }}
                className={styles.photo}/>
        </div>
    );
}
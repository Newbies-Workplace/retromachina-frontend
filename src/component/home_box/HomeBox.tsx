import React from "react";
import styles from './HomeBox.module.scss'

interface PropsHomeBox{
    children?: any,
    isBackgroundGreen: boolean, //todo fix
    onClick?: () => void
}

export const HomeBox: React.FC<PropsHomeBox> = ({children, isBackgroundGreen, onClick}) => {
    return (
        <div className={styles.wrapper} style={{backgroundColor: isBackgroundGreen ? '#73BDA8': '#FFFFFF'}} onClick={onClick}>
            <div>
                {children}
            </div>
        </div>
    );
};

import React from "react";
import styles from './HomeBox.module.scss'

interface PropsHomeBox{
    children ?: any,
    isBackgorundGreen: boolean,
    onClick?() : void
}

const HomeBox: React.FC<PropsHomeBox> = ({children,isBackgorundGreen,onClick}) => {
    
    return(
        <div className={styles.wrapper} style={{backgroundColor: isBackgorundGreen ? '#73BDA8': '#F4F2E6'}} onClick={onClick}>
            <div>
                {children}
            </div>
        </div>
    );

};

export default HomeBox
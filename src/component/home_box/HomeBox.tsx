import React from "react";
import styles from './HomeBox.module.scss'

interface PropsHomeBox{
    children ?: any,
    isBackgorundGreen: boolean,
    
}

const HomeBox: React.FC<PropsHomeBox> = ({children,isBackgorundGreen}) => {
    return(
        <div className={styles.wrapper} style={{backgroundColor: isBackgorundGreen ? '#73BDA8': '#F4F2E6'}} >
            <div>
                {children}
            </div>
        </div>
    );

};

export default HomeBox
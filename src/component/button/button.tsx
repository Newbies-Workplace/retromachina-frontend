import React from 'react'
import styles from './Button.module.scss'


const Button: React.FC<any> = ({children}) =>{
    return(
        <button className={styles.button}>
            {children}
        </button>
    );
};

export default Button;
import React from 'react'
import styles from './Button.module.scss'


interface PropsButton {
    onClick?(): void;
    children?: any;
}

const Button: React.FC<any> = ({children, onClick}) =>{
    return(
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    );
};

export default Button;
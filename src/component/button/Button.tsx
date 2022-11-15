import React from 'react'
import styles from './Button.module.scss'
import cs from 'classnames';


interface ButtonProps{
    onClick?(): void;


    size?: "medium" | "small" | "buttonicon" |"big"|"ultrabig"
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({children, onClick, size = "medium"}) =>{
    return(
        <button onClick={onClick} className=
        {cs(styles.button,{
            [styles.small]: size === "small",
            [styles.medium]: size === "medium",
            [styles.buttonicon]:size === "buttonicon",
            [styles.big]:size === "big",
            [styles.ultrabig]:size === "ultrabig"

        })

        
        }>
            
            {children}
        </button>
    );
};

export default Button;

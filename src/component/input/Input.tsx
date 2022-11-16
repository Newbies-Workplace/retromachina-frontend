import React from "react";
import styles from '../input/Input.module.scss';
import cs from 'classnames';


interface InputProps{
    placeholder?:string,
    value:string,
    setValue:(value:string)=>void,
    variant: "oneline" | "multiline"
}

const Input : React.FC<InputProps>  =  ({placeholder, value, setValue, variant}) =>{
    let isMultiline = false;
    return(
        <>
            {variant=="multiline"&&(
                <div className={styles.outer}>
                    <textarea  
                        className={styles.tile}
                        value={value} 
                        placeholder = {placeholder} 
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
                </div>
            )}
            {variant=="oneline"&&(
                    <input  
                        className={styles.oneline}
                        value={value} 
                        placeholder = {placeholder} 
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
            )}
        </> 
    )
}
export default Input;
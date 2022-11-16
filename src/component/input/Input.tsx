import React from "react";
import styles from '../input/Input.module.scss';


interface InputProps{
    placeholder?:string,
    value:string,
    setValue:(value:string)=>void,
}

const Input : React.FC<InputProps>  =  ({placeholder, value, setValue}) =>{
return(
    <div className={styles.outer}>
        <textarea  className={styles.tile} value={value} placeholder = {placeholder} onChange={(e)=>{setValue(e.target.value)}}/>
    </div>
);
}
export default Input;
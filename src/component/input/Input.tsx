import React , { useState } from "react";
import styles from '../input/input.module.scss';


interface InputProps{
    placeholder?:string,
    value:string,
    setValue:(value:string)=>void,
}

const Input : React.FC<InputProps>  =  ({placeholder,value,setValue}) =>{
return(
    <textarea  className={styles.tile} value={value} placeholder = {placeholder} onChange={(e)=>{setValue(e.target.value)}}/>
);
}
export default Input;
//<Input value={value} setValue={setValue} placeholder = {"bruh"}/>
// const[value, setValue] = useState<string>("");
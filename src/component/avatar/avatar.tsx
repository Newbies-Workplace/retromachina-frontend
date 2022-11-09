import { constants } from 'fs/promises';
import React from 'react';
import styles from './avatar.module.scss';

interface PropsCircle{
  isActive:Boolean,
  url:string
  
  

  

}

const Avatar : React.FC <PropsCircle> =  ({isActive, url}) => { 
  
  
  return (
    <div className={styles.circle}  style = {{outlineColor : isActive ? "#23F138": "#D9D9D9" }}>
         <img src={url} className={styles.photo}></img>
        
    

      
    </div> 
  );
}

export default  Avatar;

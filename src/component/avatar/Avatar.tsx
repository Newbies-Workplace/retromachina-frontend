
import styles from './Avatar.module.scss';
import LogoutBubble from '../logout_bubble/LogoutBubble'
import { useState , useRef, useCallback } from 'react';
import useClickOutside from "./useClickOutside";
interface PropsCircle{
  isActive:Boolean,
  url: any
}

const Avatar : React.FC <PropsCircle> =  ({isActive, url}) => { 
  const popover = useRef<any>();
  const [isOpen, toggle] = useState(false);
  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);
  
  return (
    <>
      <div className={styles.circle} ref={popover} onClick={() => toggle(true)}  style = {{outlineColor : isActive ? "#23F138": "#D9D9D9" }}>
        <img src={url} className={styles.photo}></img>
      </div>
      {
        isOpen&&<div className={styles.bubbleContainer}><LogoutBubble/></div>
      }
      
    </>
  );
}

export default  Avatar;

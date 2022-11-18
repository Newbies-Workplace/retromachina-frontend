import styles from './Avatar.module.scss';
import React, { useState , useRef, useCallback } from 'react';
import useClickOutside from "../../context/useClickOutside";

interface PropsCircle{
  isActive:Boolean,
  url: any
}

export const Avatar : React.FC<React.PropsWithChildren<PropsCircle>> =  ({isActive, url, children}) => {
  const popover = useRef<any>();
  const [isOpen, toggle] = useState(false); //todo fix
  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);

  return (
      <>
        <div
            className={styles.circle}
            onClick={() => toggle(true)}
            style={{outlineColor: isActive ? "#23F138" : "#D9D9D9"}}>
          <img src={url} className={styles.photo} alt={"avatar"} />
        </div>

        {
            isOpen && <div className={styles.bubbleContainer} ref={popover}>{children}</div>
        }
      </>
  );
}
import React, { useContext } from "react";
import { createContext } from "react";
import styles from './toolbox.module.scss'
import Button from "../button/Button";
import TickIconSvg from '../../assets/icons/tick.svg'
import RightArrowIconSvg from '../../assets/icons/right-arrow.svg'
import LeftArrowIconSvg from '../../assets/icons/left-arrow.svg'
import HourglassIconSvg from '../../assets/icons/hourglass.svg'
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";




const Toolbox = () =>{
    const [peopleReady , setPeopleReady]= useState(0);

    return(
        
        <div className={styles.toolbox}>
            <Button size ="medium" className={styles.timer}>
                <HourglassIconSvg/>
            </Button>
            
            <div className={styles.midbox}>
                <Button size="medium" className={styles.readybutton} onClick={()=>setPeopleReady(peopleReady+1)}>
                    <TickIconSvg/>
                </Button>
                <ProgressBar 
                    completed={peopleReady}
                    bgColor="#73bda8"
                    isLabelVisible={false}
                    labelColor="#e80909"
                    height="10px"
                    baseBgColor="#F4F2E6"
                    />
            </div>
            
            <div className={styles.buttonbox}>
                <Button size ="small" className={styles.button}>
                    <LeftArrowIconSvg/>
                </Button>
                <Button size ="small" className={styles.button}>
                    <RightArrowIconSvg/>
                </Button>
            </div>
        </div>
    );
}
export default Toolbox
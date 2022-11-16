import React from "react";
import styles from './toolbox.module.scss'
import Button from "../button/Button";
import TickIconSvg from '../../assets/icons/tick.svg'
import RightArrowIconSvg from '../../assets/icons/right-arrow.svg'
import LeftArrowIconSvg from '../../assets/icons/left-arrow.svg'
import HourglassIconSvg from '../../assets/icons/hourglass.svg'

const Toolbox = () =>{
    return(
        <div className={styles.toolbox}>
                <Button size ="medium" className={styles.timer}>
                    <HourglassIconSvg/>
                </Button>
                <div className={styles.midbox}>
                    <Button size="medium" className={styles.readybutton}>
                        <TickIconSvg/>
                    </Button>
                    <div className={styles.progressbar}>

                    </div>
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
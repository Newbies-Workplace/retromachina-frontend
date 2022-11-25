import React from "react";
import { Avatar } from "../../component/avatar/Avatar";
import Navbar from "../../component/navbar/Navbar";
import styles from '../summary/SummaryView.module.scss'


interface SummaryViewProps{
    users:{
        value:number,
    }[]
    cards:{
        value:number,
    }[]
}

export const SummaryView: React.FC<React.PropsWithChildren<SummaryViewProps>> = ({users,cards})=>{
    return(
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.textSection}>
                        <div className={styles.textFile}>Retro #3 23.12.2022</div>
                    </div>
                    
                    <div className={styles.authorAndCardSection}>
                        <div className={styles.authorSection}>
                            <Avatar url= {"https://lh3.googleusercontent.com/a/ALm5wu3SC-7-heYYInoj9MSiA9rsQ91W_smQI9bcn9rp=s96-c"
                                        } isActive={true}>
                            </Avatar>
                        </div>

                        <div className={styles.cardSection}>
                            <div className={styles.blackcard}></div>
                            <div className={styles.blackcard}></div>
                            <div className={styles.blackcard}></div>           
                        </div>                  
                    </div>
                     
                </div>
            </div>
        </>
    );

}  
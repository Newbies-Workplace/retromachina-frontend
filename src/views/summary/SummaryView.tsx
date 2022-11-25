import React from "react";
import { Avatar } from "../../component/avatar/Avatar";
import { Card } from "../../component/card/Card";
import Navbar from "../../component/navbar/Navbar";
import styles from '../summary/SummaryView.module.scss'
import QuestionMarkSvg from '../../assets/icons/question-mark.svg'


interface SummaryViewProps{
    users:{
        avatar_link:string,
        isActive:boolean,
        nick:string,
    }[]
    cards:{
        text:string,
    }[]
}

export const SummaryView: React.FC<React.PropsWithChildren<SummaryViewProps>> = ({users,cards})=>{
    return(
        <>
            <Navbar>
                <div className={styles.summaryField}>
                    Podsumowanie  
                    <QuestionMarkSvg style={{marginLeft:"40px"}}></QuestionMarkSvg>
                </div>
            </Navbar>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.textSection}>
                        <div className={styles.textFile}>Retro #3 23.12.2022</div>
                    </div>
                    {users.map((user)=>{
                        return(
                            <div className={styles.authorAndCardSection}>
                                <div className={styles.authorSection}>
                                    <Avatar url={user.avatar_link} isActive={user.isActive}></Avatar>
                                    {user.nick}
                                </div>
                                {cards.map((card)=>{
                                    return(
                                        <div className={styles.cardSection}>
                                            <div className={styles.blackcard}></div>
                                        </div>
                                    )

                                })
                            }
                            </div>
                            
                            )
                            
                            
                        })
                    }
        
                        
                     
                </div>
            </div>
        </>
    );

}  
import React from 'react';
import styles from './navbar.module.scss';
import Button from '../button/button'
import CreateTeamSvg from '../../assets/icons/create-team.svg'
import Circle from '../avatar/avatar';
import Avatar from '../avatar/avatar';

interface PropsNavbar{
    isOnRun:boolean,
    isScrumMaster: boolean,
    children ?: React.ReactElement
}

const Navbar: React.FC<PropsNavbar> = ({isOnRun,isScrumMaster,children}) =>{
    
    return(
        <div className={styles.navbar}>
            <div className={styles.sectionWrapper}>
                <div className={styles.section1}>

                    <div className={styles.name}>
                        <h1>RETROMACHINA</h1> 
                    </div>

                    <div className={styles.usection}>
                        <Avatar isActive={true}  url= {"https://pbs.twimg.com/media/D8Dp0c5WkAAkvME.jpg "}/>
                        
                    </div>
                    
                </div>
                <div className={styles.section2}>
                   
                    {
                        isScrumMaster &&
                        <div className={styles.buttonWrapper}>
                            <Button><CreateTeamSvg />Stwórz Zespół</Button>
                        </div>
                    }
                
                    {children} 
                    
                </div>
            
                <div className={styles.section3}>
                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;


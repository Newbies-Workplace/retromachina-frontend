import React from 'react';
import styles from './navbar.module.scss';
import Button from '../button/button'
import CreateTeamSvg from '../../assets/icons/create-team.svg'
import Circle from '../avatar/avatar';
import Avatar from '../avatar/avatar';
import LogoSvg from '../../assets/images/Logo.svg'
import Tile from '../header_tile/header_tile';

interface PropsNavbar{
    isOnRun:boolean,
    isScrumMaster: boolean,
    children ?: any
}

const Navbar: React.FC<PropsNavbar> = ({isOnRun,isScrumMaster,children}) =>{
    
    return(
        <div className={styles.navbar}>
            <div className={styles.sectionWrapper}>
                
                <div className={styles.section1}>

                    <div className={styles.name}>
                        <LogoSvg />
                    </div>
                    
                    

                    <div className={styles.usection}>
                        
                        <Avatar isActive={true}  url= {"https://pbs.twimg.com/media/D8Dp0c5WkAAkvME.jpg "}/>
                        
                        
                    </div>
                    
                </div>
                <div className={styles.section2}>
                
                    
                    {
                        isScrumMaster && !isOnRun &&
                        <div className={styles.buttonWrapper}>
                            <Button><CreateTeamSvg /><p>Stwórz Zespół</p></Button>
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


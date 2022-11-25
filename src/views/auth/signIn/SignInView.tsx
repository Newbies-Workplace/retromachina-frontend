import React from 'react';
import GoogleButton from 'react-google-button';
import styles from './SignInView.module.scss';
import LogoSvg from '../../../assets/images/logo.svg'



export const SignInView: React.FC = () => {
    const href = API_URL + "google/redirect";
   
    return (
       
         <div className={styles.container}>
            
            
             <div className={styles.dialog}>
            
                 <div className={styles.text}>
                     <LogoSvg />
                     <span>powered by <a href="http://newbies.pl">Newbies</a></span>
                 </div>

                <a href={href}>
                    <GoogleButton className={styles.googleBtn} />
                 </a>
            </div> 
         </div>
    );
};
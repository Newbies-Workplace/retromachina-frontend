import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import styles from './SignInView.module.scss';
import LogoSvg from '../../../assets/images/logo.svg'


const SignInView = () => {
   
    const href = API_URL + "google/redirect";
    return (
        <div className={styles.container}>
            
            
            <div className={styles.dialog}>

                <div className={styles.text}>
                    <LogoSvg />

                    <p>powered by <a href="http://newbies.pl">Newbies</a></p>
                </div>

                <a href={href}>
                    <GoogleButton className={styles.googleBtn} />
                </a>
            </div>
        </div>
    );
};



export default SignInView;

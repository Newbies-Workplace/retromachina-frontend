import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import styles from './SignInView.module.scss';
import LogoSvg from '../../../assets/images/logo.svg'
import Toolbox from '../../../component/toolbox/toolbox';


const SignInView = () => {
   
    const href = API_URL + "google/redirect";
    return (
        
        <div className={styles.container}>
            <Toolbox isScrumMaster={true} isVotingVisible={false} isFinishVisible={true}/>
            
            {/* <div className={styles.dialog}>
            
                <div className={styles.text}>
                    <LogoSvg />

                    <p>powered by <a href="http://newbies.pl">Newbies</a></p>
                </div>

                <a href={href}>
                    <GoogleButton className={styles.googleBtn} />
                </a>
            </div> */}
        </div>
    );
};



export default SignInView;

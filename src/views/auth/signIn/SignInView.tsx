import React from 'react';
import GoogleButton from 'react-google-button';
import styles from './SignInView.module.scss';

const SignInView = () => {
    const href = __API_URL__ + "/v1/redirect/google"
    return (
        <div className={styles.container}>
            <div className={styles.dialog}>

                <div className={styles.text}>
                    <h1>RETROMACHINA</h1>

                    <p>powered by <a href="http://newbies.pl">Newbies</a></p>
                </div>

                <a href={href}>
                    <GoogleButton className={styles.googleBtn}/>
                </a>
            </div>
        </div>
    );
};



export default SignInView;

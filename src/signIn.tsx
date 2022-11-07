import React from 'react';
import GoogleButton from 'react-google-button';
import styles from './signIn.module.scss' 




const Signin = () =>{
  return(
  <div className={styles.wrapper}>

    <div className={styles.text}>
      <h1>RETROMACHINA</h1>
      <p>powerd by <a href="http://newbies.pl/">Newbies</a></p>
    </div>

    <a href="http://localhost:3000/google/redirect">
      <GoogleButton className={styles.googleBtn}/>
    </a>
  </div>
  );
};



export default Signin;

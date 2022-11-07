import React from 'react';
import GoogleButton from 'react-google-button';
import './signIn.sass' 




const Signin = () =>{
  return(
  <div className='wrapper'>

    <div className='text'>
      <h1>RETROMACHINA</h1>
      <p>powerd by <a href="http://newbies.pl/">Newbies</a></p>
    </div>

    <a href="">
      <GoogleButton className='google-btn'/>
    </a>
  </div>
  );
};



export default Signin;

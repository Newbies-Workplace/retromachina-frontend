// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import Signin  from './component/signIn/signIn'
// import Navbar from './component/navbar/navbar';
// import './login-page.sass'

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// root.render(<Signin />);
     
import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './component/navbar/navbar';
import './home.sass'

const value = false;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Navbar isScrumMaster={value} />);
     
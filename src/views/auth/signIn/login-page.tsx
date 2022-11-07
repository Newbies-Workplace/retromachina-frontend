import React from 'react';
import ReactDOM from 'react-dom/client'
import Signin from '../../../component/signIn/signIn';
import 'login-page.scss'
import axios from 'axios'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Signin/>);
import axios from 'axios';
import styles from '../SignInView.module.scss';
import LogoSvg from '../../../../assets/images/logo.svg'
import Loader from '../../../../component/loader/Loader'
import { useEffect } from 'react';
import { useUser } from '../../../../context/UserContext.hook';
import { useNavigate } from 'react-router';

const LoadingPage = () => {

    const {login,user} = useUser();
    const navigate = useNavigate();
    useEffect(()=> {
        const cookie = parseCookie(document.cookie)['jwtToken'];
        console.log(cookie);
        login(cookie)
        .then( () => {navigate('/')})
        .catch()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.dialog}>
                <div className={styles.text}>
                    <LogoSvg />
                    <p>powered by <a href="http://newbies.pl">Newbies</a></p>
                </div>
                <Loader />
            </div>
        </div>
    );
};

const parseCookie = (str: any) =>
  str
  .split(';')
  .map((v: any) => v.split('='))
  .reduce((acc: any, v:any) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});

export default LoadingPage

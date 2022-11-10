import axios from 'axios';
import styles from '../SignInView.module.scss';
import LogoSvg from '../../../../assets/images/logo.svg'
import Loader from '../../../../component/loader/Loader'
import { useEffect } from 'react';
import { useUser } from '../../../../context/UserContext.hook';
import { useNavigate } from 'react-router';

const LoadingPage = () => {

    const { login, user } = useUser();
    const navigate = useNavigate();

    useEffect(()=> {
        const params = Object.fromEntries(
            new URLSearchParams(window.location.search)
        );
        login(params)
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

export default LoadingPage

import styles from './LoadingView.module.scss';
import LogoSvg from '../../assets/images/logo.svg'
import Loader from '../loader/Loader'

const LoadingView = () => {
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

export default LoadingView
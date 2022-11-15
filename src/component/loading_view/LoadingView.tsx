import styles from './LoadingView.module.scss';
import LogoSvg from '../../assets/images/logo.svg'
import Loader from '../loader/Loader'
import InputTile from '../input_tile/input_tile';

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

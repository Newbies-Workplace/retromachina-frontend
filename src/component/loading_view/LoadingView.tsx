import styles from './LoadingView.module.scss';
import LogoSvg from '../../assets/images/logo.svg'
import {ProgressBar} from '../progress_bar/ProgressBar'

export const LoadingView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.dialog}>
                <div className={styles.text}>
                    <LogoSvg />
                    <p>powered by <a href="http://newbies.pl">Newbies</a></p>
                </div>

                <ProgressBar />
            </div>
        </div>
    );
};

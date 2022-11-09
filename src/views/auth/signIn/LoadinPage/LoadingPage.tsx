
import styles from '../SignInView.module.scss';
import LogoSvg from '../../../../assets/images/logo.svg'

const Loading = () => {
    
    return (
        <div className={styles.container}>
            <div className={styles.dialog}>

                <div className={styles.text}>
                    <LogoSvg />

                    <p>powered by <a href="http://newbies.pl">Newbies</a></p>
                </div>
                <div className={styles.loadingWrapper}>
                    <div className={styles.loading}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </div>
    );
};




export default Loading

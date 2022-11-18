import styles from './LogoutBubble.module.scss'
import {Button} from '../button/Button'
import { useUser } from '../../context/UserContext.hook'
import { useNavigate } from 'react-router'

export const LogoutBubble = () => {
    const navigate = useNavigate();
    const User = useUser();

    const onLogoutClick = () => {
        window.localStorage.clear();
        navigate("/signin")
    }

    return(
        <div className={styles.bubbleWrapper} >
            <div className={styles.pointer} />

            <div className={styles.bubble}>
                <p>{User.user?.nick}</p>
                <p>{User.user?.email}</p>

                <Button
                    className={styles.logoutButton}
                    size='small'
                    onClick={onLogoutClick}>
                    Wyloguj
                </Button>
            </div>  
        </div> 
    )
}
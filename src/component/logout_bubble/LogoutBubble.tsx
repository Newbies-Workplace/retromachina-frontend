import styles from './LogoutBubble.module.scss'
import {Button} from '../button/Button'
import { useUser } from '../../context/UserContext.hook'
import { useNavigate } from 'react-router'

export const LogoutBubble = () => {
    const navigate = useNavigate();
    const {user} = useUser();

    const onLogoutClick = () => {
        window.localStorage.clear();
        navigate("/signin")
    }

    return (
        <div className={styles.bubble}>
            <span>{user?.nick}</span>
            <span>{user?.email}</span>

            <Button
                size='small'
                className={styles.logoutButton}
                onClick={onLogoutClick}>
                Wyloguj
            </Button>
        </div>
    )
}
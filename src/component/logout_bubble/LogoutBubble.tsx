import styles from './LogoutBubble.module.scss'
import Button from '../button/Button'
import { useUser } from '../../context/UserContext.hook'
import { useNavigate } from 'react-router'

const LogoutBubble = () => {
    const navigate = useNavigate();
    const User = useUser();
    console.log(User.user);
    return(
        <div className={styles.bubbleWrapper} >
            <div className={styles.pointer}></div>
            <div className={styles.bubble}>
                <p>{User.user?.nick}</p>
                <p>{User.user?.email}</p>
                <Button className={styles.logoutButton} size='small' onClick={()=>{window.localStorage.clear();navigate("/signin")}} >Wyloguj</Button>
            </div>  
        </div> 
    )
}

export default LogoutBubble
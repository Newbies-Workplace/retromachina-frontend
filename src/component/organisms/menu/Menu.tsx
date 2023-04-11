import styles from './Menu.module.scss'
import {Button} from '../../atoms/button/Button'
import { useUser } from '../../../context/user/UserContext.hook'
import { useNavigate } from 'react-router'
import {Avatar} from "../../atoms/avatar/Avatar";
import AuthorsIcon from '../../../assets/icons/authors.svg';
import React from "react";
import {Link} from "react-router-dom";

export const Menu = () => {
    const navigate = useNavigate();
    const {user, isScrumMaster} = useUser();

    const onLogoutClick = () => {
        window.localStorage.clear();
        navigate("/signin")
    }

    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={styles.user}>
                    <div className={styles.avatar}>
                        <Avatar url={user?.avatar_link} size={40}/>

                        {isScrumMaster &&
                            <span className={styles.scrumMasterIndicator}>SM</span>
                        }
                    </div>

                    <div className={styles.userData}>
                        <span className={styles.nickname}>{user?.nick}</span>
                        <span className={styles.mail}>{user?.email}</span>
                    </div>
                </div>

                <div className={styles.teams}>
                    {user?.teams?.map(team =>
                        <span
                            key={team.id}
                            className={styles.team}>
                            {team.name}
                        </span>
                    )}
                </div>
            </div>

            <div className={styles.options}>
                <Link className={styles.option} to={'http://newbies.pl'}>
                    <AuthorsIcon width={24} height={24}/>
                    O autorach
                </Link>
            </div>

            <Button
                size='small'
                className={styles.logout}
                onClick={onLogoutClick}>
                Wyloguj
            </Button>
        </div>
    )
}
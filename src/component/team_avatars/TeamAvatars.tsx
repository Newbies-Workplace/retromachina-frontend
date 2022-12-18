import React from "react";
import styles from '../../component/team_avatars/TeamAvatars.module.scss'
import {Avatar} from '../avatar/Avatar'

interface TeamAvatarsProps {
    users: {
        id: string
        isActive: boolean,
        avatar_link: string
    }[]
}

export const TeamAvatars: React.FC<React.PropsWithChildren<TeamAvatarsProps>> = ({users})=>{
    return (
        <div className={styles.wrapper}>
            {users.map((user) => {
                return (
                    <div className={styles.avatar} key={user.id}>
                        <Avatar
                            isActive={user.isActive}
                            url={user.avatar_link}/>
                    </div>
                );
            })}
        </div>
    );
}

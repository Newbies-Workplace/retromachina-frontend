import React from "react";
import styles from '../../component/team_avatars/TeamAvatars.module.scss'
import {Avatar} from '../avatar/Avatar'

interface TeamAvatarsProps {
    users: {
        isActive: boolean,
        avatar_link: string
    }[]
}

export const TeamAvatars: React.FC<React.PropsWithChildren<TeamAvatarsProps>> = ({users})=>{
    const usersLength = users.length;

    return (
        <div className={styles.wrapper}>
            {users.map((user, index) => {
                const avatarZIndex = usersLength + (index + 1)

                return(
                    <div className={styles.avatar}>
                        <Avatar
                            isActive={user.isActive}
                            url={user.avatar_link}
                            style={{zIndex: avatarZIndex}} />
                    </div>
                );
            })}
        </div>
    );
}

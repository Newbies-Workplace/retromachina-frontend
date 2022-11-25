import React from "react";
import styles from '../../component/team_avatars/TeamAvatars.module.scss'
import {Avatar} from '../avatar/Avatar'

interface TeamAvatarProps{
//TODO: zmiana typu danych usera
    users:{
        isActive:boolean,
        avatar_link:string
    }[]
    
}

export const TeamAvatar:React.FC<React.PropsWithChildren<TeamAvatarProps>> = ({children,users})=>{
    const usersLength = users.length;
    return(
        <div className={styles.wrapper}>
            {users.map((user,index)=>{
                const calcZIndex = usersLength+(index+1)
                return(
                    //TODO:user nie ma isActive 
                    <div className={styles.avatar}>
                    <Avatar isActive={user.isActive} url={user.avatar_link} style={{zIndex:calcZIndex}}></Avatar>
                    </div>
                );
            })}
        </div>
    );
}

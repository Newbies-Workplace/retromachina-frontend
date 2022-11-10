import React from 'react'
import styles from './TeamRetroList.module.scss'
import HomeBox from '../home_box/HomeBox';
import Button from '../button/button';
import AddIcon from '../../assets/icons/add-icon.svg';
import TaskIconSvg from '../../assets/icons/task-icon.svg'
import EditIconSvg from '../../assets/icons/edit-icon.svg'
import { RetroResponse } from '../../interfaces/Retro.interface';
import { axiosInstance } from '../../AxiosInstance';



const retros: Record<string,RetroResponse[]> = {
    "1":
        [
            {
            "id":"1",
            "name":"Retro #23assdadsa",
            "data":"date",
            "team_id":"1",
            "is_running": false
            },

            {
            "id":"2",
            "name":"Retro #2",
            "data":"date",
            "team_id":"1",
            "is_running": false
            }
        ],
    "2":
    [
        {
        "id":"1",
        "name":"Retro #7",
        "data":"date",
        "team_id":"2",
        "is_running": false
        },

        {
        "id":"2",
        "name":"Retro #2",
        "data":"date",
        "team_id":"2",
        "is_running": false
        }
    ]
} 




interface PropsRetroTeam {
    isScrumMaster: boolean,
    teamName: string,
    teamId: string
}


const RetroTeamList: React.FC<PropsRetroTeam> = ({isScrumMaster,teamName,teamId}) => {
    () => {axiosInstance.get("/users?team_id={"+teamId+"}")
    .then()
    .catch()
}
    
    
    return(
    <div className={styles.container}>
        <div className={styles.icons}>
            <h2 className={styles.title}>{teamName}</h2>
            <Button><TaskIconSvg/><p>Lista zadań</p></Button>

            {
            isScrumMaster &&
            <Button><EditIconSvg/></Button>
            }
            
        </div>
        <div className={styles.wrapper}>

            {
            isScrumMaster &&
            <HomeBox isBackgorundGreen={true} >Nowa Retrospektywa <AddIcon/> </HomeBox>
            }

            {
                (retros[teamId]||[]).map((retro)=>{
                    return(
                        
                        <HomeBox isBackgorundGreen={false}><p>{retro.name}</p><p>{retro.data}</p></HomeBox>
                )})
                
            }   

        </div>
    </div>
    );
};

export default RetroTeamList
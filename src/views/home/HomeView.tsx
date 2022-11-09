import React from 'react'
import Navbar from '../../component/navbar/navbar';
import styles from './HomeView.module.scss'
import HomeBox from '../../component/home_box/HomeBox';
import Button from '../../component/button/button';
import AddIcon from '../../assets/icons/add-icon.svg';
import TaskIconSvg from '../../assets/icons/task-icon.svg'
import EditIconSvg from '../../assets/icons/edit-icon.svg'

const user = {
    "nick": "Nothing undefined",
    "email": "nothingchanneling@gmail.com",
    "avatar_link": "https://lh3.googleusercontent.com/a/ALm5wu3ogQbgCQGHPYvEeHIpbBfBpbLIiypIf7a_XCXk=s96-c",
    "user_type": "SCRUM_MASTER",
    "teams": [
        {
            "id": "1",
            "name": "Team Owca",
            "retro": [
                {
                
                "id":"1",
                "name":"Retro #1",
                "team_id":"1",
                "date":"data",
                "is_runing":"true"
                },
                {
                "id":"2",
                "name":"Retro #2",
                "team_id":"1",
                "date":"data",
                "is_runing":"true"
                }
            ]
        },
        {
            "id": "2",
            "name": "Team Piotrek",
            "retro":[
                {
                
                    "id":"3",
                    "name":"Retro #12",
                    "team_id":"2",
                    "date":"data",
                    "is_runing":"true"
                    },
                    {
                    "id":"4",
                    "name":"Retro #23",
                    "team_id":"2",
                    "date":"data",
                    "is_runing":"true"
                    }
            ]
        }
    ]
}

const HomeView: React.FC = () => {
    const isScrumMaster=user.user_type=="SCRUM_MASTER";
    return (
        <>
            <Navbar isScrumMaster={isScrumMaster} isOnRun={false}/>
            {user.teams.map((team) => {
                return(
                    <div className={styles.container}>
                        <div className={styles.icons}>
                            <h2 className={styles.title}>{team.name}</h2>
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
                        {team.retro.map((retros)=>{
                            return(
                                <HomeBox isBackgorundGreen={false} >{retros.name}<p>{retros.date}</p></HomeBox>
                            )
                            }
                        )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default HomeView
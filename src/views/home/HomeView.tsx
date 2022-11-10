import React from 'react'
import Navbar from '../../component/navbar/Navbar';
import styles from './HomeView.module.scss'
import TeamRetro from '../../component/team_retro/TeamRetro';
import Tile from '../../component/header_tile/header_tile'

const user = {
    "nick": "Nothing undefined",
    "email": "nothingchanneling@gmail.com",
    "avatar_link": "https://lh3.googleusercontent.com/a/ALm5wu3ogQbgCQGHPYvEeHIpbBfBpbLIiypIf7a_XCXk=s96-c",
    "user_type": "USER",
    "teams": [
        {
            "id": "1",
            "name": "Team Owca",
            
        },
        {
            "id": "2",
            "name": "Team Piotrek",
        }
    ]
}

const HomeView: React.FC = () => {
    const isScrumMaster=user.user_type=="SCRUM_MASTER";
    return (
        <>
            <Navbar isScrumMaster={isScrumMaster} isOnRun={false}> <Tile text=""/> </Navbar>
            {user.teams.map((team) => {
               return(<TeamRetro isScrumMaster={true} teamName={team.name} teamId={team.id}/> )
               
            })
            }
        </>
    );
};

export default HomeView
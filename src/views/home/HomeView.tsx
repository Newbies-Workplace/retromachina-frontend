import React, { useEffect } from 'react'
import Navbar from '../../component/navbar/Navbar';
import TeamRetro from '../../component/team_retro/TeamRetro';
import { useUser } from '../../context/UserContext.hook';
import Tile from '../../component/header_tile/header_tile'



const HomeView: React.FC = () => {
    
    const {user} = useUser()
    const isScrumMaster= user?.user_type=="SCRUM_MASTER";
    
    return (
        <>
                <Navbar isScrumMaster={isScrumMaster} isOnRun={false}> <Tile text=""/> </Navbar>
                {
                user?.teams.map((team,key) => {
                    return(<TeamRetro isScrumMaster={isScrumMaster} teamName={team.name} teamId={team.id} key={key}/>)
                })
            }
        </>
    );
};

export default HomeView
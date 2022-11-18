import React from "react";
import { useUser } from "../../context/UserContext.hook";
import Navbar from "../../component/navbar/Navbar";
import NotFoundSvg from "../../assets/images/not-found.svg"
import styles from "./HomeView.module.scss"
import {TeamRetroList} from "../../component/team_retro_list/TeamRetroList";

const HomeView: React.FC = () => {
    const { user, isScrumMaster } = useUser();

    return (
        <>
            <Navbar isScrumMaster={isScrumMaster} isOnRun={false} isButtonHidden={false} />

            {user?.teams?.length === 0 &&
                <div className={styles.noTeam}>
                    <div className={styles.text}>
                        <p>Nie jesteś członkiem żadnego Zespołu!</p>
                        <p style={{fontSize: 18}}>Daj znać swojemu scrum masterowi</p>
                    </div>

                    <NotFoundSvg />
                </div>
            }

            {user?.teams.map((team) =>
                <TeamRetroList
                    key={team.id}
                    teamId={team.id}
                    teamName={team.name} />
            )}
        </>
    )
};

export default HomeView;

import React, { useEffect } from "react";
import {useUser} from "../../context/UserContext.hook";
import Navbar from "../../component/navbar/Navbar";
import NotFoundSvg from "../../assets/images/not-found.svg"
import styles from "./HomeView.module.scss"
import {TeamRetroList} from "../../component/team_retro_list/TeamRetroList";
import {Button} from "../../component/button/Button";
import CreateTeamSvg from "../../assets/icons/create-team.svg";
import {useNavigate} from "react-router";


const HomeView: React.FC = () => {
    const { user } = useUser();
    const navigate = useNavigate()

    return (
        <>
            <Navbar>
                { user?.user_type=="SCRUM_MASTER"  &&
                    <div className={styles.buttonWrapper}>

                        <Button
                            onClick={() => navigate("/team/create")}
                            size="small"
                        >
                            <CreateTeamSvg />
                            Stwórz Zespół
                        </Button>

                    </div>
                }
            </Navbar>
            <div className={styles.container}>
                {user?.teams?.length === 0 &&
                    <div className={styles.noTeam}>
                        <div className={styles.text}>
                            <span>Nie jesteś członkiem żadnego Zespołu!</span>
                            <span style={{fontSize: 18}}>Daj znać swojemu scrum masterowi</span>
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
            </div>
        </>
    )
};

export default HomeView;

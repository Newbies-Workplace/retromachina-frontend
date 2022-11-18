import React from "react";
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
                <div className={styles.buttonWrapper}>
                    <Button
                        onClick={() => {
                            navigate("/team/create");
                        }}
                        size="small"
                        className={styles.button}
                    >

                        <CreateTeamSvg />
                        <p>Stwórz Zespół</p>
                    </Button>
                </div>
            </Navbar>
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

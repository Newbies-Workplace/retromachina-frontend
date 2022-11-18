import React, { useEffect, useState } from "react";
import styles from "./TeamRetroList.module.scss";
import {HomeBox} from "../home_box/HomeBox";
import {Button} from "../button/Button";
import AddIcon from "../../assets/icons/add-icon.svg";
import TaskIconSvg from "../../assets/icons/task-icon.svg";
import EditIconSvg from "../../assets/icons/edit-icon.svg";
import { RetroResponse } from "../../api/retro/Retro.interface";
import { useNavigate } from "react-router-dom";
import { getRetrosByTeamId } from "../../api/retro/Retro.service";
import {useUser} from "../../context/UserContext.hook";

interface TeamRetroListProps {
    teamName: string;
    teamId: string;
}

export const TeamRetroList: React.FC<TeamRetroListProps> = ({ teamName, teamId }) => {
    const [retros, setRetros] = useState(Array<RetroResponse>());
    const navigate = useNavigate();
    const {isScrumMaster} = useUser()

    useEffect( () => {
        getRetrosByTeamId(teamId)
            .then((retros) => {
                setRetros(retros);
            })
            .catch(console.log);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.icons}>
                <h2 className={styles.title}>{teamName}</h2>
                <Button onClick={() => navigate("/tasks")} size="small">
                    <TaskIconSvg />
                    <p>Lista zadań</p>
                </Button>

                {isScrumMaster &&
                    <Button onClick={() => navigate(`/team/${teamId}/edit`)} size="buttonicon">
                        <EditIconSvg />
                    </Button>
                }
            </div>
            <div className={styles.wrapper}>
                {isScrumMaster &&
                    <HomeBox isBackgroundGreen={true} onClick={() => navigate("/retro/create")}>
                        Nowa Retrospektywa
                        <AddIcon />
                    </HomeBox>
                }

                {retros.map((retro, index) => {
                    const retroIndex = retros.length - index

                    return (
                        <HomeBox isBackgroundGreen={false} key={retro.id}>
                            <span>
                                {`Retro #${retroIndex}`}
                            </span>
                            <span>
                                {new Date(retro.date).toLocaleDateString("pl-Pl")}
                            </span>
                        </HomeBox>
                    );
                })}
            </div>
        </div>
    );
};

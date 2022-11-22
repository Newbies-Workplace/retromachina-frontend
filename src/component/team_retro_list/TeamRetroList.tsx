import React, { useEffect, useState } from "react";
import styles from "./TeamRetroList.module.scss";
import {Button} from "../button/Button";
import AddIcon from "../../assets/icons/add-icon.svg";
import TaskIconSvg from "../../assets/icons/task-icon.svg";
import EditIconSvg from "../../assets/icons/edit-icon.svg";
import { RetroResponse } from "../../api/retro/Retro.interface";
import { useNavigate } from "react-router-dom";
import { getRetrosByTeamId } from "../../api/retro/Retro.service";
import {useUser} from "../../context/UserContext.hook";
import cs from "classnames";
import { RetroCard } from "../retro_card/RetroCard"
import { useRetro } from "../../context/RetroContext.hook";

interface TeamRetroListProps {
    teamName: string;
    teamId: string;
}

export const TeamRetroList: React.FC<TeamRetroListProps> = ({ teamName, teamId }) => {
    const [retros, setRetros] = useState(Array<RetroResponse>());
    const navigate = useNavigate();
    const {isScrumMaster} = useUser()
    const { onRun } = useRetro()

    useEffect( () => {
        getRetrosByTeamId(teamId)
            .then((retros) => {
                setRetros(retros);
            })
            .catch(console.log);
    }, []);

    return (
        <div className={styles.team}>
            <div className={styles.topBar}>
                <h2 className={styles.title}>{teamName}</h2>
                <Button onClick={() => navigate("/tasks")} size="small">
                    <TaskIconSvg />
                    Lista zadań
                </Button>

                {isScrumMaster &&
                    <Button onClick={() => navigate(`/team/${teamId}/edit`)} size="round">
                        <EditIconSvg />
                    </Button>
                    
                }
                
            </div>

            <div className={styles.wrapper}>
                {isScrumMaster && !onRun &&
                    <Button className={styles.retroButton} onClick={() => navigate(`/retro/create?teamId=${teamId}`)}>
                        Nowa Retrospektywa
                        <AddIcon />
                    </Button>
                }
                {
                            onRun&&<RetroCard />
                }
                    
                    {retros.map((retro, index) =>
                        <Button className={cs(styles.retroButton, styles.retro)} key={retro.id}>
                            <span style={{fontSize: 24}}>{`Retro #${retros.length - index}`}</span>
                            <span style={{fontSize: 24}}>{new Date(retro.date).toLocaleDateString("pl-Pl")}</span>
                        </Button>
                    )}
            </div>
        </div>
    );
};

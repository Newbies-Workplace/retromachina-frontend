import React, {useEffect, useState} from "react";
import styles from "./TeamRetroList.module.scss";
import {Button} from "../button/Button";
import AddIcon from "../../assets/icons/add-icon.svg";
import TaskIconSvg from "../../assets/icons/task-icon.svg";
import EditIconSvg from "../../assets/icons/edit-icon.svg";
import {RetroResponse} from "../../api/retro/Retro.interface";
import {useNavigate} from "react-router-dom";
import {getRetrosByTeamId} from "../../api/retro/Retro.service";
import {useUser} from "../../context/UserContext.hook";
import cs from "classnames";
import {ActiveRetroCard} from "../retro_card/ActiveRetroCard";

interface TeamRetroListProps {
    teamName: string;
    teamId: string;
}

export const TeamRetroList: React.FC<TeamRetroListProps> = (
    {
        teamName,
        teamId,
    }
) => {
    const navigate = useNavigate();
    const { isScrumMaster } = useUser();
    const [retros, setRetros] = useState<RetroResponse[]>([]);
    const isAnyRetroRunning = retros.findIndex((a) => a.is_running) !== -1;

    useEffect(() => {
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
                <Button onClick={() => navigate(`/team/${teamId}/board`)} size="small">
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
                {isScrumMaster && !isAnyRetroRunning && (
                    <Button
                        className={styles.retroButton}
                        onClick={() => navigate(`/retro/create?teamId=${teamId}`)}
                    >
                        Nowa Retrospektywa
                        <AddIcon />
                    </Button>
                )}
                {retros.map((retro, index) => {
                    if (retro.is_running) {
                        return (
                            <ActiveRetroCard key={retro.id} onClick={() => navigate(`/retro/${retro.id}/reflection`)}/>
                        )
                    }

                    return (
                        <Button
                            className={cs(styles.retroButton, styles.retro)}
                            key={retro.id}
                            onClick={() => navigate(`/retro/${retro.id}/summary`)}>
                            <span style={{ fontSize: 24 }}>
                                {`Retro #${retros.length - index}`}
                            </span>
                            <span style={{ fontSize: 24 }}>
                                {new Date(retro.date).toLocaleDateString("pl-Pl")}
                            </span>
                        </Button>
                    )
                })}
            </div>
        </div>
    );
};

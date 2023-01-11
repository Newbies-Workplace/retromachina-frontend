import React, { useEffect, useState } from "react";
import { Avatar } from "../../component/avatar/Avatar";
import { Card } from "../../component/card/Card";
import Navbar from "../../component/navbar/Navbar";
import styles from "../summary/SummaryView.module.scss";
import { TaskResponse } from "../../api/task/Task.interface";
import { getTasksByRetroId } from "../../api/task/Task.service";
import { useParams } from "react-router";
import { UserResponse } from "../../api/user/User.interfaces";
import { getUsersByTeamId } from "../../api/user/User.service";
import { RetroResponse } from "../../api/retro/Retro.interface";
import { getRetroByRetroId } from "../../api/retro/Retro.service";
import dayjs from "dayjs";
import {HeaderBar} from "../../component/header_bar/HeaderBar";

export const SummaryView = () => {
    const { retroId } = useParams<{retroId: string}>();
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [retro, setRetro] = useState<RetroResponse | null>(null);

    useEffect(() => {
        if (!retroId) return;

        getTasksByRetroId(retroId)
            .then((tasks) => {
                setTasks(tasks);
            });

        getRetroByRetroId(retroId)
            .then((retro) => {
                setRetro(retro);

                getUsersByTeamId(retro.team_id)
                    .then((users) => {
                        setUsers(users);
                    })
            });
    }, [])

    return (
        <>
            <Navbar>
                <HeaderBar className={styles.header} text={"Podsumowanie"} active/>
            </Navbar>

            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.textSection}>
                        <div className={styles.name}>
                            Retro {dayjs(retro?.date).format("YYYY-MM-DD")}
                        </div>
                    </div>

                    {users.map((user) => {
                        return (
                            <div key={user.user_id} className={styles.authorAndCardSection}>
                                <div className={styles.authorSection}>
                                    <Avatar url={user.avatar_link} />
                                    {user.nick}
                                </div>

                                <div className={styles.cardSection}>
                                    {(() => {
                                        const userTasks = tasks.filter((task) => task.ownerId === user.user_id).map((task) => {
                                            return (
                                                <Card
                                                    className={styles.card}
                                                    key={task.id}
                                                    teamUsers={[]}
                                                    text={task.text} />
                                            );
                                        });

                                        return userTasks.length !== 0 ? userTasks : "Brak zadań";
                                    })()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

import { axiosInstance } from '../../api/AxiosInstance';
import { useUser } from '../../context/UserContext.hook'
import { useNavigate, useParams } from 'react-router'
import {TeamForm} from '../../component/forms/TeamForm';
import { Team } from '../../interfaces/Team.interface';
import React, { useEffect, useState } from 'react';
import { User } from '../../interfaces/User.interface';
import Navbar from '../../component/navbar/Navbar';
import { getInvitesInfoByTeamId, getTeamInfoByTeamId } from '../../api/team/Team.service';
import { getUsersInfoByTeamId } from '../../api/user/User.service';
import {HeaderBar} from "../../component/header_bar/HeaderBar";
import styles from "./TeamEditView.module.scss";
import {ProgressBar} from "../../component/progress_bar/ProgressBar";

interface Invite {
    email: string,
    team_id: string
}

const TeamEditView: React.FC = () => {
    const { teamId } = useParams<{teamId: string}>();
    const { user, refreshUser } = useUser();
    const navigate = useNavigate()
    const [team, setTeam] = useState<Team | null>(null);

    useEffect(() => {
        const waitForResult = async () => {
            const name = await getTeamInfoByTeamId(teamId || "")
                .then((response) => response.data.name)

            const emails = await getUsersInfoByTeamId(teamId || "")
                .then((response) => response.data.users.filter((elem: User) => {
                    return elem.email != user?.email
                }).map((elem: User) => {
                    return elem.email
                }))

            const invites = await getInvitesInfoByTeamId(teamId || "")
                .then((response) => response.data.invites.map((invite: Invite) => invite.email))

            setTeam({
                name,
                emails: [...emails, ...invites]
            });
        }

        waitForResult();
    }, []);

    const onSubmit = (team: Team ) => {
        axiosInstance.put(`/teams/${teamId}`, {
            name: team.name,
            emails: team.emails
        }).then((response) => {
            if (response.status == 204) {
                refreshUser()
                    .then(() => {
                        navigate("/");
                    })
            } else {
                //coś się musi stać???
                // - pewnie coś musi
                console.log(response.status);
            }
        })
    };

    return (
        <>
            <Navbar>
                <HeaderBar text="Edycja Zespołu" />
            </Navbar>

            {!team &&
                <div className={styles.container}>
                    <div className={styles.loadingWrapper}>
                        <ProgressBar/>
                    </div>
                </div>
            }

            {team &&
                <TeamForm onSubmit={onSubmit} userEmail={user?.email || ""} team={team} />
            }
        </>
    );
};

export default TeamEditView;
  
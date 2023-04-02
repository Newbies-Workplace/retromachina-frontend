import {axiosInstance} from '../../api/AxiosInstance';
import {useUser} from '../../context/UserContext.hook'
import {Navigate, useNavigate, useParams} from 'react-router'
import {TeamForm} from '../../component/forms/TeamForm';
import {TeamRequest} from '../../api/team/Team.interface';
import React, {useEffect, useState} from 'react';
import {User} from '../../interfaces/User.interface';
import Navbar from '../../component/navbar/Navbar';
import {getInvitesByTeamId, getTeamById} from '../../api/team/Team.service';
import {getUsersByTeamId} from '../../api/user/User.service';
import {HeaderBar} from "../../component/header_bar/HeaderBar";
import styles from "./TeamEditView.module.scss";
import {ProgressBar} from "../../component/progress_bar/ProgressBar";
import {ConfirmDialog} from "../../component/confirm_dialog/ConfirmDialog";
import {toast} from "react-toastify";

interface Invite {
    email: string,
    team_id: string
}

const TeamEditView: React.FC = () => {
    const { teamId } = useParams<{teamId: string}>();
    if (!teamId) {
        return <Navigate to={"/"}/>
    }
    const { user, refreshUser } = useUser();
    const navigate = useNavigate()
    const [team, setTeam] = useState<TeamRequest | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false)

    useEffect(() => {
        const waitForResult = async () => {
            const name = await getTeamById(teamId)
                .then((data) => data.name)

            const emails = await getUsersByTeamId(teamId)
                .then((users) => users.filter((elem: User) => {
                    return elem.email != user?.email
                }).map((elem: User) => {
                    return elem.email
                }))

            const invites = await getInvitesByTeamId(teamId)
                .then((data) => data.invites.map((invite: Invite) => invite.email))

            setTeam({
                name,
                emails: [...emails, ...invites]
            });
        }

        waitForResult();
    }, []);

    const onSubmit = (team: TeamRequest ) => {
        axiosInstance.put(`/teams/${teamId}`, {
            name: team.name,
            emails: team.emails
        })
            .then((response) => {
                refreshUser()
                    .then(() => {
                        navigate("/");
                    })
            })
            .then(() => {
                toast.success('Zmiany zapisano')
            })
            .catch((e) => {
                console.log(e)
                toast.error('Wystąpił błąd')
            })
    };

    const onDelete = () => {
        axiosInstance.delete(`/teams/${teamId}`)
            .then(() => {
                refreshUser()
                    .then(() => {
                        navigate("/");
                    })
            })
            .then(() => {
                toast.success('Zespół usunięto')
            })
            .catch((e) => {
                console.log(e)
                toast.error('Wystąpił błąd')
            })
    }

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

            {confirmOpen &&
                <ConfirmDialog
                    title={"Usunięcie zespołu"}
                    content={`Czy na pewno chcesz usunąć zespół ${team?.name ?? ""}?`}
                    onConfirmed={onDelete}
                    onDismiss={() => setConfirmOpen(false)}/>
            }

            {team &&
                <TeamForm
                    onSubmit={onSubmit}
                    onDelete={() => setConfirmOpen(true)}
                    userEmail={user?.email || ""}
                    team={team}
                    deletable />
            }
        </>
    );
};

export default TeamEditView;
  
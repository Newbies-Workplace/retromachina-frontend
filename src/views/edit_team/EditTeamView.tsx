import { axiosInstance } from '../../api/AxiosInstance';
import { useUser } from '../../context/UserContext.hook'
import { useNavigate, useParams } from 'react-router'
import TeamForm from '../../component/forms/TeamForm';
import { Team } from '../../interfaces/Team.interface';
import { useEffect, useState } from 'react';
import LoadingView from '../../component/loading_view/LoadingView';
import { User } from '../../interfaces/User.interface';
import Navbar from '../../component/navbar/Navbar';
import HeaderBar from '../../component/header_bar/HeaderBar';
import { getInvitesInfoByTeamId, getTeamInfoByTeamId } from '../../api/team/Team.service';
import { getUsersInfoByTeamId } from '../../api/user/User.service';


interface Invite {
    email: string,
    team_id: string
}

const CreateTeamview: React.FC = () => {
    const { teamId } = useParams<{teamId: string}>();
    const { user, refreshUser } = useUser();
    const navigate = useNavigate()
    const [team, setTeam] = useState<Team | null>(null);

    function onSubmit(team: Team ) {
        axiosInstance.put(`/teams/${teamId}`, {
                name: team.name,
                emails: team.emails
        }).then((response) => {
            if (response.status == 204) {
                refreshUser()
                    .then(() => {
                        navigate("/");
                    })
            }
            else {
                //coś się musi stać???
                console.log(response.status);
            }
        })
    }

    useEffect(() => {
        let name: string;
        let emails: string[];
        let invites: string[];

        const waitForResult = async () => {
            await getTeamInfoByTeamId(teamId || "")
                .then((response) => {
                    name = response.data.name;
                });

            await getUsersInfoByTeamId(teamId || "")
                .then((response) => {
                    emails = response.data.users.filter((elem: User) => {
                        return elem.email != user?.email
                    }).map((elem: User) => {
                        return elem.email
                    });
                });

            await getInvitesInfoByTeamId(teamId || "")
                .then((response) => {
                    invites = response.data.invites.map((invite: Invite) => invite.email);
                })

            setTeam({
                name,
                emails: [...emails, ...invites]
            });
        }

        waitForResult();

    }, []);

    
    if (!team)
        return <LoadingView/>

    return (
        <>
            <Navbar isScrumMaster={true} isOnRun={false} isButtonHiden={true}>
                <HeaderBar text="Edycja Zespołu"></HeaderBar>
            </Navbar>
            <TeamForm onSubmit={onSubmit} userEmail={user?.email || ""} team={team} />
        </>
    );
  };
  
  export default CreateTeamview;
  
import { axiosInstance } from '../../api/AxiosInstance';
import { useUser } from '../../context/UserContext.hook'
import { useNavigate, useParams } from 'react-router'
import TeamForm from '../../component/forms/TeamForm';
import { Team } from '../../interfaces/Team.interface';
import { useEffect, useState } from 'react';
import LoadingView from '../../component/loading_view/LoadingView';
import { User } from '../../interfaces/User.interface';


interface Invite {
    email: string,
    team_id: string
}

const CreateTeamview: React.FC = () => {
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
  
    const { teamId } = useParams<{teamId: string}>();
    const { user, refreshUser } = useUser();
    const navigate = useNavigate()
    const [team, setTeam] = useState<Team | null>(null);

    useEffect(() => {
        let name: string;
        let emails: string[];
        let invites: string[];

        const waitForResult = async () => {
            await axiosInstance.get(`teams/${teamId}`)
                .then((response) => {
                    name = response.data.name;
                });

            await axiosInstance.get(`users?team_id=${teamId}`)
                .then((response) => {
                    emails = response.data.users.filter((elem: User) => {
                        return elem.email != user?.email
                    }).map((elem: User) => {
                        return elem.email
                    });
                });

            await axiosInstance.get(`invites?team_id=${teamId}`)
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
      <TeamForm onSubmit={onSubmit} userEmail={user?.email || ""} team={team} />
    );
  };
  
  export default CreateTeamview;
  
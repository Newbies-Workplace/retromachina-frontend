import { axiosInstance } from '../../api/AxiosInstance';
import { useUser } from '../../context/UserContext.hook'
import { useNavigate } from 'react-router'
import TeamForm from '../../component/forms/TeamForm';
import { Team } from '../../interfaces/Team.interface';
import Navbar from '../../component/navbar/Navbar';
import HeaderBar from '../../component/header_bar/HeaderBar';
import { createTeam } from '../../api/team/Team.service';


const CreateTeamview: React.FC = () => {

  const onSubmit = (team: Team) => {
        createTeam(team).then((response) => {
          if (response.status == 201) {
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

  const { user, refreshUser } = useUser();
  const navigate = useNavigate()

  return (
    <>
        <Navbar isScrumMaster={true} isOnRun={false} isButtonHiden={true}>
            <HeaderBar text="Edycja Zespołu"></HeaderBar>
        </Navbar>
        <TeamForm onSubmit={onSubmit} userEmail={user?.email || ""} team={null} />
    </>
  );
};

export default CreateTeamview;

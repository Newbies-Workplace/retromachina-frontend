import { axiosInstance } from '../../AxiosInstance'
import { useUser } from '../../context/UserContext.hook'
import { useNavigate } from 'react-router'
import { TeamResult } from "../../interfaces/Team.interface";
import TeamForm from '../../component/forms/TeamForm';

const CreateTeamview: React.FC = () => {

  function onSubmit(team: TeamResult ) {
      axiosInstance.post("/teams", {
              name: team.name,
              emails: team.emails
      }).then((response) => {
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
    <TeamForm onSubmit={onSubmit} userEmail={user?.email || ""} team={null} />
  );
};

export default CreateTeamview;

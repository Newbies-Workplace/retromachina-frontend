import React, { useEffect } from "react";
import TeamRetro from "../../component/team_retro_list/TeamRetroList";
import { useUser } from "../../context/UserContext.hook";
import Navbar from "../../component/navbar/Navbar";

const HomeView: React.FC = () => {
  const { user } = useUser();

  const isScrumMaster = user?.user_type == "SCRUM_MASTER";

  return (
    <>
      <Navbar isScrumMaster={isScrumMaster} isOnRun={false} isButtonHiden={false}></Navbar>
      {user?.teams.map((team, key) => {
        return (
          <TeamRetro
            isScrumMaster={isScrumMaster}
            teamName={team.name}
            teamId={team.id}
            key={key}
          />
        );
      })}
    </>
  );
};

export default HomeView;

import React from "react";
import TeamRetro from "../../component/team_retro_list/TeamRetroList";
import { useUser } from "../../context/UserContext.hook";
import Navbar from "../../component/navbar/Navbar";
import NotFoundSvg from "../../assets/images/not-found.svg"
import styles from "./HomeView.module.scss"

const HomeView: React.FC = () => {
  const { user } = useUser();
  console.log(user);
  const isScrumMaster = user?.user_type == "SCRUM_MASTER";
  if(user?.teams?.length==0){
    return (
      <>
        <Navbar isScrumMaster={isScrumMaster} isOnRun={false} isButtonHiden={false}></Navbar>
        <div className={styles.noTeam}>
          <p>Przepraszamy Nie dodano cię jeszcze do żadnego Zespołu!</p>
          <NotFoundSvg />
        </div>
      </>
    );
  }else{
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
  }
  
};

export default HomeView;

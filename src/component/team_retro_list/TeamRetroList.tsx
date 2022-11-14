import React, { useEffect, useState } from "react";
import styles from "./TeamRetroList.module.scss";
import HomeBox from "../home_box/HomeBox";
import Button from "../button/Button";
import AddIcon from "../../assets/icons/add-icon.svg";
import TaskIconSvg from "../../assets/icons/task-icon.svg";
import EditIconSvg from "../../assets/icons/edit-icon.svg";
import { RetroResponse } from "../../interfaces/Retro.interface";
import { axiosInstance } from "../../AxiosInstance";
import { useNavigate } from "react-router-dom";

interface PropsRetroTeam {
  isScrumMaster: boolean;
  teamName: string;
  teamId: string;
}

const RetroTeamList: React.FC<PropsRetroTeam> = ({ isScrumMaster, teamName, teamId }) => {

  const [retros, setRetros] = useState(Array<RetroResponse>());
  const navigate = useNavigate();

  useEffect( () => {
    axiosInstance.get("/retros/" + teamId)
      .then((response) => {
        setRetros(response.data);

      }).catch();
  }, []);

  let counter = retros.length;
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <h2 className={styles.title}>{teamName}</h2>
          <Button onClick={() => {navigate("/tasks")}}>
            <TaskIconSvg />
            <p>Lista zadań</p>
          </Button>

        {isScrumMaster && (
          <Button onClick={() => {navigate("/create")}}>
            <EditIconSvg />
          </Button>
        )}
      </div>
      <div className={styles.wrapper}>
        {isScrumMaster && (
          
          <HomeBox isBackgorundGreen={true} onClick={() => {navigate("/retro")}}>
            Nowa Retrospektywa <AddIcon />{" "}
          </HomeBox>
        )}

        {(retros).map((retro, key) => {
          return (
            <HomeBox isBackgorundGreen={false} key={key}>
              <div>
                {`Retro #${counter--}`}
              </div>
              <div>
                {new Date(retro.date).toLocaleDateString("pl-Pl")}
              </div>
            </HomeBox>
          );
        })}
      </div>
    </div>
  );
};

export default RetroTeamList;

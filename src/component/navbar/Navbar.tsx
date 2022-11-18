import React from "react";
import styles from "./Navbar.module.scss";
import {Button} from "../button/Button";
import CreateTeamSvg from "../../assets/icons/create-team.svg";
import LogoSvg from "../../assets/images/logo.svg";
import {Avatar} from "../avatar/Avatar";
import {useNavigate} from "react-router";
import {useUser} from "../../context/UserContext.hook";
import {LogoutBubble} from "../logout_bubble/LogoutBubble"

//todo bruh moment
interface PropsNavbar {
  isOnRun: boolean;
  isScrumMaster: boolean;
  isButtonHidden: boolean;
}

const Navbar: React.FC<React.PropsWithChildren<PropsNavbar>> = ({
  isOnRun,
  isScrumMaster,
  isButtonHidden,
  children,
}) => {
  const navigate = useNavigate();
  const User = useUser();

  return (
    <div className={styles.navbar}>
      <div className={styles.sectionWrapper}>
        <div className={styles.section1}>
          <div className={styles.name}>
            <LogoSvg onClick={() => navigate("/")} style={{cursor: "pointer"}}/>
          </div>

          <div className={styles.usection}>
            <div className={styles.profile}>
              <Avatar isActive={true} url={User.user?.avatar_link} >
                <LogoutBubble />
              </Avatar>
            </div>
          </div>
        </div>
        <div className={styles.section2}>
            {isScrumMaster && !isOnRun && !isButtonHidden && (
              <div className={styles.buttonWrapper}>
                <Button
                  onClick={() => {
                    navigate("/team/create");
                  }}
                  size="small"
                  className={styles.button}
                >
                  
                  <CreateTeamSvg />
                  <p>Stwórz Zespół</p>
                </Button>
              </div>
            )}
          {children}
        </div>

        <div className={styles.section3}>
          <div className={styles.line}></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import styles from "./navbar.module.scss";
import Button from "../button/Button";
import CreateTeamSvg from "../../assets/icons/create-team.svg";
import LogoSvg from "../../assets/images/Logo.svg";
import Timer from "../timer/Timer";
import Avatar from "../avatar/Avatar";

interface PropsNavbar {
  isOnRun: boolean;
  isScrumMaster: boolean;
  isButtonHiden: boolean;
  children?: any;
}

const Navbar: React.FC<PropsNavbar> = ({
  isOnRun,
  isScrumMaster,
  isButtonHiden,
  children,
}) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.sectionWrapper}>
        <div className={styles.section1}>
          <div className={styles.name}>
            <LogoSvg />
          </div>

          <div className={styles.usection}>
            {isOnRun && (
              <div className={styles.timerBox}>
                <Timer variant={2} time={"0:30"} />
              </div>
            )}
            <div className={styles.profile}>
              <Avatar
                isActive={true}
                url={"https://pbs.twimg.com/media/D8Dp0c5WkAAkvME.jpg "}
              />
            </div>
          </div>
        </div>
        <div className={styles.section2}>
          {isScrumMaster && !isOnRun && !isButtonHiden &&(
            <div className={styles.buttonWrapper}>
              <Button>
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

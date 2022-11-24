import { useEffect, useState } from "react";
import { useRetro } from "../../context/RetroContext.hook";
import styles from "./RetroHeaderTracker.module.scss";
import cs from "classnames";
import QuestionMarkSvg from "../../assets/icons/question-mark-icon.svg"

export const RetroHeaderTracker = () => {
  const [index, setindex] = useState(4);
  const { roomState } = useRetro();
  const classChanges = (stateName: string) => {
    return cs(styles.retroHeader, {
      [styles.active]: roomState === stateName,
    });
  };

  useEffect(() => {
    switch (roomState) {
      case "reflection":
        setindex(0);
        break;
      case "group":
        setindex(1);
        break;
      case "vote":
        setindex(2);
        break;
      case "discuss":
        setindex(3);
        break;
      default:
        setindex(0);
    }
  }, [roomState]);
  return (
    <div
      className={styles.wrapper}
      style={{ left: `calc(50% - (141px + (298px*${index})))` }}
    >
      <div className={classChanges("reflection")}>Refleksja{roomState==="reflection"&&<QuestionMarkSvg/>}</div>
      <div className={classChanges("group")}>Grupowanie{roomState==="group"&&<QuestionMarkSvg/>}</div>
      <div className={classChanges("vote")}>Głosowanie{roomState==="vote"&&<QuestionMarkSvg/>}</div>
      <div className={classChanges("discuss")}>Dyskusja{roomState==="discuss"&&<QuestionMarkSvg/>}</div>
      <div className={styles.retroHeader}>Podsumowanie</div>
    </div>
  );
};

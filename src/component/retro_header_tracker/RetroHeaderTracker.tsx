import { useEffect, useState } from "react";
import { useRetro } from "../../context/RetroContext.hook";
import styles from "./RetroHeaderTracker.module.scss";
import cs from "classnames";
import QuestionMarkSvg from "../../assets/icons/question-mark-icon.svg"

export const RetroHeaderTracker = () => {
  const [index, setIndex] = useState(4);
  const { roomState } = useRetro();
  const classChanges = (stateName: string) => {
    return cs(styles.retroHeader, {
      [styles.active]: roomState === stateName,
    });
  };

  useEffect(() => {
    switch (roomState) {
      case "reflection":
        setIndex(0);
        break;
      case "group":
        setIndex(1);
        break;
      case "vote":
        setIndex(2);
        break;
      case "discuss":
        setIndex(3);
        break;
      default:
        setIndex(0);
    }
  }, [roomState]);
  return (
    <div
      className={styles.wrapper}
      style={{ left: `calc(50% - (141px + (298px*${index})))` }}
    >
      <div className={classChanges("reflection")}>Refleksja</div>
      <div className={classChanges("group")}>Grupowanie</div>
      <div className={classChanges("vote")}>Głosowanie</div>
      <div className={classChanges("discuss")}>Dyskusja</div>

      <div className={styles.retroHeader}>Podsumowanie</div>
    </div>
  );
};

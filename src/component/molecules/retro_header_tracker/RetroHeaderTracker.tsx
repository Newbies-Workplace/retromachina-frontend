import React, { useEffect, useState } from "react";
import styles from "./RetroHeaderTracker.module.scss";
import {useRetro} from "../../../context/retro/RetroContext.hook";
import {HeaderBar} from "../../atoms/header_bar/HeaderBar";

export const RetroHeaderTracker = () => {
  const [index, setIndex] = useState(4);
  const { roomState } = useRetro();

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
      style={{left: `calc(50% - (141px + (298px * ${index})))` }}
    >
      <HeaderBar className={styles.retroHeader} text={"Refleksja"} active={roomState === "reflection"}/>
      <HeaderBar className={styles.retroHeader} text={"Grupowanie"} active={roomState === "group"}/>
      <HeaderBar className={styles.retroHeader} text={"Głosowanie"} active={roomState === "vote"}/>
      <HeaderBar className={styles.retroHeader} text={"Dyskusja"} active={roomState === "discuss"}/>
      <HeaderBar className={styles.retroHeader} text={"Podsumowanie"}/>
    </div>
  );
};

import React from "react";
import styles from "./Timer.module.scss";

interface PropsTimer {
  time: number;
}

const Timer: React.FC<PropsTimer> = ({ time }) => {
  let className;
  let _time;

  if ( time == 0) {
    className = styles.noTime;
    _time = "po czasie";
  } else if (time <= 30) {
    className = styles.closeEnd;
    _time = `0:${time}`;
  } else if (time > 30) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    _time = `${minutes}:${seconds}`;

    className = styles.regular;

  }
  return <div className={className}>{_time}</div>;
};

export default Timer;

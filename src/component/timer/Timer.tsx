import React from "react";
import styles from "./Timer.module.scss";

interface PropsTimer {
  time: string;
  variant: 1 | 2 | 3;
}

const Timer: React.FC<PropsTimer> = ({ time, variant }) => {
  let className;
  let _time;

  switch (variant) {
    case 1:
      className = styles.state1;
      _time = time;
      break;
    case 2:
      className = styles.state2;
      _time = time;
      break;
    case 3:
      className = styles.state3;
      _time = "po czasie";
      break;
  }
  return <div className={className}>{_time}</div>;
};

export default Timer;

import React from "react";
import styles from "./Timer.module.scss";
import cs from 'classnames';


interface PropsTimer {
  time: number;
}

const Timer: React.FC<PropsTimer> = ({ time }) => {
  let variant;
  let timeText;

  if ( time <= 0) {
    variant = "end"
    timeText = "po czasie";
  } else if (time <= 30) {
    variant = "expires"
    timeText = `0:${time}`;
  } else if (time > 30) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    variant = "default"
    timeText = `${minutes}:${seconds}`;

  }
  return(
    <div className={cs(styles.timer,{
        [styles.default]: variant === "default",
        [styles.expires]: variant === "expires",
        [styles.end]:variant === "end",})}>
        {timeText}
    </div>
  )
};

export default Timer;

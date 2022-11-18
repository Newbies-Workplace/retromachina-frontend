import React from "react";
import styles from "./Timer.module.scss";
import cs from 'classnames';
import dayjs from "dayjs";

interface PropsTimer {
    time: number;
}

export const Timer: React.FC<PropsTimer> = ({ time }) => {
    let isExpiring;
    let isFinished;
    let timeText = dayjs.duration(time, 's').format('m:ss');

    if (time <= 0) {
        isFinished = true
        timeText = "po czasie";
    } else if (time <= 30) {
        isExpiring = true
    }

    return(
        <div className={cs(
            styles.timer,
            {
                [styles.expires]: isExpiring,
                [styles.end]: isFinished,
            }
        )}>
            {timeText}
        </div>
    )
};

import styles from "./CardIndicator.module.scss";
import React from "react";
import cs from "classnames";

interface PropsCardCount {
  count: number;
  isWriting?: Boolean
}

export const CardCount: React.FC<PropsCardCount> = ({ count, isWriting }) => {
  const lastDigit = count % 10

  let text = "kartki"
  if (count == 1) {
    text = "kartka"
  } else if (
      count == 0 || (count >= 5 && count <= 21) ||
      [0, 1, 5, 6, 7, 8, 9].includes(lastDigit)
  ) {
    text = "kartek"
  }

  return (
    <div className={styles.wrapper}>
      <div className={cs(styles.rect, {
        [styles.active]: isWriting
      })}/>

      {count} {text} zespołu
    </div>
  );
};
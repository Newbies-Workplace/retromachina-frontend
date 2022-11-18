import React, { useState } from "react";
import AddIcon from "../../../assets/icons/add-icon.svg";
import MinusIcons from "../../../assets/icons/minus-icon.svg";
import styles from "./Counter.module.scss";
import cs from "classnames";

interface CounterProps {
  canIncrement: boolean;
  count: number;
  onIncrement(): void;
  onDecrement(): void;
}

const Counter: React.FC<CounterProps> = ({
  count,
  canIncrement,
  onIncrement,
  onDecrement,
}) => {
  const onMinusClick = () => {
    if (count > 0) onDecrement();
  };

  const onPlusClick = () => {
    if (canIncrement) onIncrement();
  };

  return (
    <div className={styles.wrapper}>
      <MinusIcons
        className={cs(styles.action, {
          [styles.active]: count > 0,
          [styles.inactive]: count <= 0,
        })}
      />
      {count}
      <AddIcon
        style={{ color: "grey" }}
        className={cs(styles.action, {
          [styles.active]: canIncrement,
          [styles.inactive]: !canIncrement,
        })}
      />
    </div>
  );
};
export default Counter;

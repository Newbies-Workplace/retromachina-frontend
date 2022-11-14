import styles from "./CardIndicator.module.scss";

interface PropsCardCount {
  count: number;
  isWritting?: Boolean
}

const CardCount: React.FC<PropsCardCount> = ({ count, isWritting }) => {
  let text = "kartki";
  let lastDigit = count % 10;

  if (count == 1) text = "kartka";
  else if (
    count == 0 ||
    (count >= 5 && count <= 21) || // nastki są dziwne "kartki"
    [0, 1, 5, 6, 7, 8, 9].includes(lastDigit)
  ) text = "kartek";

  return (
    <div className={styles.wrapper}>
      <div className={isWritting ? styles.rectColor : styles.rect}></div>
      {count} {text} zespołu
    </div>
  );
};

export default CardCount;

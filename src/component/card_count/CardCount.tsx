import styles from "./CardCount.module.scss";

interface PropsCardCount {
  count: number;
  variant: 1 | 2;
}

const CardCount: React.FC<PropsCardCount> = ({ count, variant }) => {
  let text = "kartki";

  if (count == 0 || count >= 5) text = "kartek";
  else if (count == 1) text = "kartka";

  return (
    <div className={styles.wrapper}>
      <div className={variant > 1 ? styles.rectColor : styles.rect}></div>
      {count} {text} zespołu
    </div>
  );
};

export default CardCount;

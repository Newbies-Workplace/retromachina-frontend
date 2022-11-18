import React from "react";
import styles from "./Button.module.scss";
import cs from "classnames";

interface ButtonProps {
  onClick?:() => void;
  className?: string;
  size?: "medium" | "small" | "buttonicon" | "big" | "ultrabig";
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  size = "medium",
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cs(
        styles.button,
        {
          [styles.small]: size === "small",
          [styles.medium]: size === "medium",
          [styles.buttonicon]: size === "buttonicon",
          [styles.big]: size === "big",
          [styles.ultrabig]: size === "ultrabig",
        },
        className
      )}
    >
      {children}
    </button>
  );
};
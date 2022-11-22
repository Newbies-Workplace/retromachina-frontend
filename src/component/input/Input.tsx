import React from "react";
import styles from '../input/Input.module.scss';
import cs from "classnames";

interface InputProps {
    className?: string
    value: string
    setValue: (value: string) => void
    placeholder?: string
    multiline?: boolean
    right?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({className, value, setValue, placeholder, multiline = false, right}) => {
    return (
        <div className={styles.wrapper}>
            {multiline
                ? (
                    <textarea
                        className={cs(styles.multiline, className)}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}
                    />
                )
                : (
                    <input
                        className={cs(styles.oneline, className)}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}
                    />
                )
            }

            {right !== undefined &&
                <div className={styles.rightWrapper}>
                    {right}
                </div>
            }
        </div>
    )
}
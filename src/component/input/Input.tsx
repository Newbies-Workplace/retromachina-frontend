import React, { KeyboardEventHandler } from "react";
import styles from '../input/Input.module.scss';
import cs from "classnames";

interface InputProps {
    style: any 
    className?: string
    value: string
    setValue: (value: string) => void
    placeholder?: string
    multiline?: boolean
    right?: React.ReactNode
    onKeyDown?: KeyboardEventHandler<any> | undefined
}

export const Input: React.FC<InputProps> = ({className, value, setValue, placeholder, onKeyDown, multiline = false, right, style}) => {
    return (
        <div className={styles.wrapper} style={style}>
            {multiline
                ? (
                    <textarea
                        style={style}
                        className={cs(styles.multiline, className)}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                )
                : (
                    <input
                        style={style}
                        className={cs(styles.oneline, className)}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
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
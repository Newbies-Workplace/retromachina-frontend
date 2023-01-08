import React from "react";
import styles from "./ConfirmDialog.module.scss"
import { Portal } from 'react-portal';
import {Button} from "../button/Button";
import cs from "classnames";

interface ConfirmDialogProps {
    title: string
    content: string
    onConfirmed: () => void
    onDismiss: () => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({title, content, onConfirmed, onDismiss}) => {
    return (
        <Portal>
            <div className={styles.backdrop} onClick={onDismiss}>
                <div className={styles.dialog} onClick={e => e.stopPropagation()}>
                    <div className={styles.title}>{title}</div>

                    <div className={styles.content}>
                        {content}
                    </div>

                    <div className={styles.buttons}>
                        <Button
                            size={"small"}
                            className={cs(styles.button, styles.noButton)}
                            onClick={onDismiss}>
                            Nie
                        </Button>

                        <Button
                            size={"small"}
                            className={styles.button}
                            onClick={onConfirmed}>
                            Tak
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
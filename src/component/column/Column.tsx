import React from "react";
import {SocketColumn} from "../../api/socket/Socket.events";
import {ColumnHeader} from "../column_header/ColumnHeader";
import styles from "./Column.module.scss";

interface ColumnProps {
    columnData: SocketColumn,
}

export const Column: React.FC<React.PropsWithChildren<ColumnProps>> = (
    {
        children,
        columnData,
    }
) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.columnHeaderWrapper}>
                <ColumnHeader
                    color={columnData.color}
                    header={columnData.name}
                    description={columnData.desc ?? undefined} />
            </div>

            {children}
        </div>
    );
};

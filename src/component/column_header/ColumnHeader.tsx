import React from "react"
import style from './ColumnHeader.module.scss'

interface ColumnHeaderProps{
    color: string,
    withDescription: boolean,
    header: string
}

export const ColumnHeader: React.FC<React.PropsWithChildren<ColumnHeaderProps>> = ({children, color, withDescription, header}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <div className={style.boxWrapper}>
                    <div className={style.box} style={{backgroundColor: color}}></div>
                </div>
                <span>{header}</span>
            </div>
        
            {withDescription &&
            <div className={style.description}>
                <span>{children}</span>
            </div>
            }
        </div>
    )
}
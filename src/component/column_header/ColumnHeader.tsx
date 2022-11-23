import React from "react"
import style from './ColumnHeader.module.scss'

interface ColumnHeaderProps{
    color: string,
    description?: string
    header: string
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({color, description, header}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <div className={style.boxWrapper}>
                    <div className={style.box} style={{backgroundColor: color}}></div>
                </div>
                <span>{header}</span>
            </div>

            {description !== undefined &&
                <div className={style.description}>
                    <span>{description}</span>
                </div>
            }
        </div>
    )
}
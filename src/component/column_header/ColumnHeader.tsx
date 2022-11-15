import { PropsWithChildren } from "react"
import style from './ColumnHeader.module.scss'

interface ColumnHeaderProps{
    color: string,
    withDescription: boolean,
    header: string
}

const ColumnHeader: React.FC<React.PropsWithChildren<ColumnHeaderProps>> = ({children,color,withDescription,header}) => {
    return(
        <div className={style.wrapper}>
            <div className={style.title}>
                <div className={style.box} style ={{backgroundColor: color}}></div>
                <p>{header}</p>
            </div>
            { withDescription&&<p>{children}</p>}
            
        </div>
    )

}

export default ColumnHeader;
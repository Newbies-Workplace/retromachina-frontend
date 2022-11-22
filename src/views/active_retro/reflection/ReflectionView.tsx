import { Card } from "../../../component/card/Card"
import { useRetro } from "../../../context/RetroContext.hook"
import  Navbar  from "../../../component/navbar/Navbar"
import styles from "./ReflectionView.module.scss"
import { ColumnHeader } from "../../../component/column_header/ColumnHeader"
import { Input } from "../../../component/input/Input"
import { useEffect, useState } from "react"
import { CardCount } from "../../../component/card_indicator/CardIndicator"
import { SocketColumn } from "../../../api/socket/Socket.events"
import { v4 as uuid } from 'uuid';
import { Column } from "../../../component/column/Column"


interface InputProps {
    id: string,
    value: string
}

export const ReflectionView = () => {
    const [isWriting, setIsWriting] = useState(false) //TODO: dodać socketa do isWriting
    const {teamUsers , columns, usersWriting } = useRetro()

    const onCardCreated = (value: string, columnId: string) => {
        console.log(value, columnId)
    }
    
    return (
        <div className={styles.container}>
            {columns?.map((column, index)=>{
                return (
                    <Column
                        key={column.id}
                        columnData={column} 
                        onCardCreated={(value) => {
                            onCardCreated(value, column.id); 
                        }}
                        onIsWriting={(value: boolean) => {
                            setIsWriting(value);
                        }}
                        usersWriting={usersWriting} 
                        users={teamUsers} 
                        isWriting={isWriting}
                    />
                )
                })}
        </div>
    );
}


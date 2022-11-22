import { Card } from "../../../component/card/Card"
import { useRetro } from "../../../context/RetroContext.hook"
import  Navbar  from "../../../component/navbar/Navbar"
import styles from "./ReflectionView.module.scss"
import { ColumnHeader } from "../../../component/column_header/ColumnHeader"
import { Input } from "../../../component/input/Input"
import { useState } from "react"
import { CardCount } from "../../../component/card_indicator/CardIndicator"

export const ReflectionView = () => {
    const [inputValue , setInputValue]= useState("")
    const [isWriting, setIsWriting] = useState(false)
    const {teamUsers , columns, usersWriting, } = useRetro()
    
    
    return(
        <div className={styles.container}>
            {
            columns?.map(({id,color,name,desc,cards})=>{
                
                return (
                    <div className={styles.column}>
                        <div className={styles.cardWrapper}>
                        <div className={styles.columnHeaderWrapper}>
                            <ColumnHeader color={color} withDescription={desc!==null} header={name} key={id} >{desc}</ColumnHeader>
                        </div>
                            <Input value={inputValue} setValue={setInputValue} multiline={true} />
                            <CardCount count={usersWriting}/>
                            {
                                cards?.map(({text,authorId,columnId})=>{
                                    const user = teamUsers.find((user)=>user.id===authorId)
                                    return (
                                        
                                        <Card text={text} author={{
                                            avatar_link: user?.avatar_link || "",
                                            name: user?.nick || "",
                                            id:authorId
                                        }} 
                                        teamUsers={teamUsers} />
                                    )
                                })
                            }
                        </div>
                    </div>

                    
                )
            })

            }
            
        </div>
    )
    
}


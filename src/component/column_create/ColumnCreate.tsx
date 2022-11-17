import { useEffect, useRef, useState } from 'react'

import styles from './ColumnCreate.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import Input from '../input/Input'
import { ColorPicker } from '../color_picker/ColorPicker'

const ColumnCreate = () => {
    const [value1,setValue1] = useState("")
    const [value2,setValue2] = useState("")
    const [color, setColor] = useState("#FF7711")
    
    
    return(
        <div className={styles.wrapper} >
            <div className={styles.topBar}>
                <ColorPicker color={color} onChange={setColor}/>
                <Input variant="oneline" value={value1} setValue={setValue1} placeholder="Nazwa Kolumny"/>                
                <AddIconSvg className={styles.delete}/>
            </div>
            
            <div className={styles.opis}><Input variant="multiline" value={value2} setValue={setValue2} placeholder="Opis"/></div>
        </div>
    )
}

export default ColumnCreate
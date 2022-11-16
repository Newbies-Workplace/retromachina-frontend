import { useEffect, useRef, useState } from 'react'

import styles from './ColumnCreate.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import Input from '../input/Input'
import { ColorPicker } from '../color_picker/ColorPicker'

const ColumnCreate = () => {
    const [value,setValue] = useState("")
    const [color, setColor] = useState("#FF7711")
    
    
    return(
        <div className={styles.wrapper} >
            <div className={styles.topBar}>
                <ColorPicker color={color} onChange={setColor}/>                 
                <AddIconSvg className={styles.delete}/>
            </div>
            <div className={styles.header}><Input value={value} setValue={setValue} placeholder="Nazwa Kolumny"/></div>
            <div className={styles.opis}><Input value={value} setValue={setValue} placeholder="Opis"/></div>
        </div>
    )
}

export default ColumnCreate
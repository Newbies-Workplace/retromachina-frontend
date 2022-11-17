import { useEffect, useRef, useState } from 'react'

import styles from './ColumnCreate.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import Input from '../input/Input'
import { ColorPicker } from '../color_picker/ColorPicker'
import { Column } from '../../views/retro_create/RetroCreateView'

export interface ColumnCreateProps {
    color: string,
    name: string,
    desc: string
    onChange(column: {
        color: string,
        name: string,
        desc: string
    }): void
}

const ColumnCreate: React.FC<ColumnCreateProps> = ({color, onChange, name, desc }) => {
    return(
        <div className={styles.wrapper} >
            <div className={styles.topBar}>
                <ColorPicker color={color} onChange={(color) => {onChange({
                    color: color,
                    name: name,
                    desc: desc
                })}}/>
                <Input variant="oneline" value={name} setValue={(name) => {onChange({
                    color: color,
                    name: name,
                    desc: desc
                })}} placeholder="Nazwa Kolumny"/>                
                <AddIconSvg className={styles.delete}/>
            </div>
            
            <div className={styles.opis}><Input variant="multiline" value={desc} setValue={(desc) => onChange({
                    color: color,
                    name: name,
                    desc: desc
                })} placeholder="Opis"/></div>
        </div>
    )
}

export default ColumnCreate
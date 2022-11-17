import Navbar from "../../component/navbar/Navbar"
import { useUser } from "../../context/UserContext.hook";
import Tile from "../../component/header_bar/HeaderBar";
import style from './RetroCreateView.module.scss'
import Button from "../../component/button/Button";
import AddIcon from '../../assets/icons/add-icon.svg'
import ColumnCreate, { ColumnCreateProps } from "../../component/column_create/ColumnCreate";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface Column{
    id: string,
    color: string,
    name: string,
    desc: string
}


export const RetroCreateView: React.FC = () => {
    const { user } = useUser();
    const [ columns, setColumns ] = useState<Array<Column>>([]);

    const onAdd = () => {
        let column = {
            id: uuidv4(),
            color: "",
            name: "",
            desc: ""
        }

        let columnsTemp = [...columns,  column]
        setColumns(columnsTemp);
    }

    const onChange = (id: string, column: {
        color: string,
        name: string,
        desc: string
    }) => {
        const columnIndex = columns.findIndex((column) => column.id === id);
        if (columnIndex === -1) return;

        let columnsTemp = Array<Column>();

        columns.forEach((_column, index) => {
            if (index !== columnIndex) {
                columnsTemp.push(_column);
                return;
            }

            columnsTemp.push({
                id: id,
                ...column
            });
        });

        setColumns(columnsTemp);
    }


    const isScrumMaster = user?.user_type == "SCRUM_MASTER";
    return( 
        <>
            <Navbar isScrumMaster={isScrumMaster} isOnRun={false} isButtonHiden={true}><Tile text="Edycja Kolumn"></Tile></Navbar> 
            <div className={style.container}>
                <div className={style.columns}>
                    {columns.map((column: Column) => {
                        return <ColumnCreate
                            key={column.id}
                            onChange={({color, name, desc}) => onChange(column.id, {color, name, desc})}
                            color={column.color} 
                            name={column.name}
                            desc={column.desc} 
                        />
                    })}
                    <Button size="big" onClick={onAdd} > <p>Nowa Kolumna</p><AddIcon /></Button> 
                </div>
            </div>
        </>
    )
}
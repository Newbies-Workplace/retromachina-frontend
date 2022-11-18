import Navbar from "../../component/navbar/Navbar";
import { useUser } from "../../context/UserContext.hook";
import style from "./RetroCreateView.module.scss";
import {Button} from "../../component/button/Button";
import AddIcon from "../../assets/icons/add-icon.svg";
import ActionIconSvg from "../../assets/icons/action-icon.svg";
import {ColumnCreate} from "../../component/column_create/ColumnCreate";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {HeaderBar} from "../../component/header_bar/HeaderBar";

export interface Column {
  id: string;
  color: string;
  name: string;
  desc: string;
}

export const RetroCreateView: React.FC = () => {
  const {isScrumMaster} = useUser();
  const [columns, setColumns] = useState<Array<Column>>([]);

  const onAddColumn = () => {
    const column = {
      id: uuidv4(),
      color: "",
      name: "",
      desc: "",
    };

    let columnsTemp = [...columns, column];
    setColumns(columnsTemp);
  };

  const onChangeColumn = (
      id: string,
      column: {
        color: string;
        name: string;
        desc: string;
      }
  ) => {
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
        ...column,
      });
    });

    setColumns(columnsTemp);
  };

  const onDeleteColumn = (id: string) => {
    const columnIndex = columns.findIndex((column) => column.id === id);

    let columnsTemp = Array<Column>();
    columns.forEach((_column, index) => {
      if (columnIndex == index) return;
      columnsTemp.push(_column);
    });

    setColumns(columnsTemp);
  };

  return (
      <>
        <Navbar
            isScrumMaster={isScrumMaster}
            isOnRun={false}
            isButtonHidden={true}
        >
          <HeaderBar text="Edycja Kolumn"/>
        </Navbar>
        <div className={style.container}>
          <div className={style.columns}>
            {columns.map((column: Column) => {
              return (
                  <ColumnCreate
                      key={column.id}
                      onChange={({ color, name, desc }) =>
                          onChangeColumn(column.id, { color, name, desc })
                      }
                      onDelete={() => onDeleteColumn(column.id)}
                      color={column.color}
                      name={column.name}
                      desc={column.desc}
                  />
              );
            })}
            <div className={style.columnButton}>
              <Button size="big" onClick={onAddColumn}>
                <p>Nowa Kolumna</p>
                <AddIcon />
              </Button>
            </div>
          </div>
          <Button className={style.actionButton} size="ultrabig">
            <div className={style.buttonSection}>
              <p>Akcja</p>
              (Zacznij & skopiuj link)
            </div>
            <ActionIconSvg />
          </Button>
        </div>
      </>
  );
};

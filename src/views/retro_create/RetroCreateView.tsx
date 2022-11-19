import Navbar from "../../component/navbar/Navbar";
import styles from "./RetroCreateView.module.scss";
import {Button} from "../../component/button/Button";
import AddIcon from "../../assets/icons/add-icon.svg";
import ActionIconSvg from "../../assets/icons/action-icon.svg";
import {ColumnCreate} from "../../component/column_create/ColumnCreate";
import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {HeaderBar} from "../../component/header_bar/HeaderBar";
import * as qs from 'query-string';
import {Navigate, useNavigate} from "react-router";
import {getRandomTemplate} from "../../api/retro_template/RetroTemplate.service";

export interface Column {
  id: string;
  color: string;
  name: string;
  desc: string | null;
}

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const RetroCreateView: React.FC = () => {
  const params = qs.parse(location.search)
  const teamId: string = params.teamId as string
  if (!teamId) {
    return <Navigate to={"/"}/>
  }

  const [columns, setColumns] = useState<Array<Column>>([]);
  const navigate = useNavigate()

  useEffect(() => {
    randomizeTemplate()
  }, [])

  const onAddColumn = () => {
    const column = {
      id: uuidv4(),
      color: getRandomColor(),
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

  const onCreateRetroClick = async () => {
    // postRetro(teamId, columns)
    //todo ustawienie loadera zamiast kamery w actionbutton
    Promise.resolve({id: 'haba'})
        .then((retro) => {
          //todo skopiujcie linka do schowka użytkownika

          navigate(`/retro/${retro.id}`)
        })
        .catch(console.log)
  }

  const randomizeTemplate = () => {
    getRandomTemplate()
        .then((template) => {
          setColumns(template.columns.map(col => ({
            id: uuidv4(),
            name: col.name,
            desc: col.desc,
            color: col.color,
          })))
        })
        .catch(console.log)
  }

  return (
      <>
        <Navbar>
          <HeaderBar text="TODO: Nazwa zespołu"/> {/* todo możecie to wyciągnąć z kontekstu z teamów usera */}
          <Button className={styles.randomize} size={"small"} onClick={() => randomizeTemplate()}>
            Losuj szablon
          </Button>
        </Navbar>

        <div className={styles.container}>
          <div className={styles.columns}>
            {columns.map(column =>
                <ColumnCreate
                    key={column.id}
                    onChange={({color, name, desc}) =>
                        onChangeColumn(column.id, {color, name, desc})
                    }
                    onDelete={() => onDeleteColumn(column.id)}
                    color={column.color}
                    name={column.name}
                    desc={column.desc ?? ""}
                />
            )}
            <div className={styles.columnButton}>
              <Button size="big" onClick={onAddColumn}>
                <span>Nowa Kolumna</span>
                <AddIcon />
              </Button>
            </div>
          </div>

          <div className={styles.actionWrapper}>
            <Button className={styles.actionButton} onClick={onCreateRetroClick}>
              <div className={styles.buttonSection}>
                <span>Akcja</span>
                (Zacznij & skopiuj link)
              </div>

              <ActionIconSvg />
            </Button>
          </div>
        </div>
      </>
  );
};

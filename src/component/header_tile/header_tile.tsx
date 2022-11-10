import React from "react";
import styles from "./header_tile.module.scss";
import { constants } from 'fs/promises';
interface PropsTile{
    text:string,
}
const Tile : React.FC <PropsTile> = ({text}) =>{
    return(
        <div className={styles.tile}> {text} </div>

    );

}
export default Tile;
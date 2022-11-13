import React from "react";
import styles from "./HeaderBar.module.scss";

interface PropsTile{
    text:string,
    active?: Boolean
}

const Tile : React.FC <PropsTile> = ({text, active}) =>{
    if (!active) active = false;

    return(
        <div className={styles.tile}> {text} </div>
    );
}
export default Tile;
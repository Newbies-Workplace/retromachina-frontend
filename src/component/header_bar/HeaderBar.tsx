import React from "react";
import styles from "./HeaderBar.module.scss";

interface PropsTile{
    text:string,
}

const Tile : React.FC <PropsTile> = ({text}) =>{
    return(
        <div className={styles.tile}> {text} </div>

    );
}
export default Tile;
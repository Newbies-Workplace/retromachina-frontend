import React  from "react";
import styles from '../input_tile/input_tile.module.scss';

const InputTile = () =>{
    return(
        <form>
            <textarea  className={styles.tile} placeholder = "Z czego jesteśmy dumni?"/>
        </form>
    );
}
export default InputTile;
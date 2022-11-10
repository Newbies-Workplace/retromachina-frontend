import React from "react"
import styles from './Loader.module.scss'

const Loader = () =>{
    return(
        <div className={styles.loadingWrapper}>          
            <div className={styles.loading}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )  
}

export default Loader
import React from "react";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";
import styles from "./NotFoundView.module.scss"
import Navbar from "../../component/navbar/Navbar";

export const NotFoundView: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <Navbar/>

            <div className={styles.innerContainer}>
                <span>404</span>
                <Button size={'small'} onClick={() => navigate("/")}>
                    Powrót na stronę główną
                </Button>
            </div>
        </div>
    )
}
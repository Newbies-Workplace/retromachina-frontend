import Navbar from '../../component/navbar/Navbar';
import styles from './TeamLoadingView.module.scss'
import {Loader} from '../../component/loader/Loader'
import React from "react";
import {HeaderBar} from "../../component/header_bar/HeaderBar";

const TeamLoadingView: React.FC = () => {
    return (
        <>
            <Navbar isScrumMaster={true} isOnRun={false} isButtonHidden={true}>
                <HeaderBar text="Edycja Zespołu"></HeaderBar>
            </Navbar>
            <div className={styles.container}>
                <div className={styles.loadingWrapper}>
                    <Loader/>
                </div>
            </div>
        </>
    );
};

export default TeamLoadingView;

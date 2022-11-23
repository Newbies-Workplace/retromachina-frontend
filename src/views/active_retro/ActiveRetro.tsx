import React, {useEffect} from "react";
import styles from "./ActiveRetro.module.scss"
import {Route, Routes} from "react-router-dom";
import {ProgressBar} from "../../component/progress_bar/ProgressBar";
import Navbar from "../../component/navbar/Navbar";
import {Timer} from "../../component/timer/Timer";
import {useRetro} from "../../context/RetroContext.hook";
import {useNavigate} from "react-router";
import { ReflectionView } from "./reflection/ReflectionView";
import {GroupView} from "./group/GroupView";
import { Toolbox } from "../../component/toolbox/toolbox";
import { useUser } from "../../context/UserContext.hook";

const ActiveRetro: React.FC = () => {
    const navigate = useNavigate()
    const {
        timerEnds,
        roomState,
        retroId,
        setTimer,
        ready,
        setReady,
        readyPercentage,
        nextRoomState,
        prevRoomState,
    } = useRetro()
    const {isScrumMaster} = useUser()

    // to zmienia etap pokoju
    useEffect(() => {
        navigate(`/retro/${retroId}/${roomState}`)
    }, [roomState])

    return (
        <>
            <Navbar topContent={timerEnds !== null && <Timer timerEnds={timerEnds}/>}/>

            <Routes>
                <Route path="reflection" element={<ReflectionView/>} />
                <Route path="group" element={<GroupView/>} />
                <Route path="vote" element={<>vote</>} />
                <Route path="discuss" element={<>discuss</>} />
                <Route path="*" element={<><ProgressBar/></>}/>
            </Routes>

            <div className={styles.toolboxWrapper}>
                <Toolbox
                    isScrumMaster={isScrumMaster}
                    isVotingVisible={roomState == "vote"}
                    isFinishVisible={roomState == "discuss"}
                    onTimeChanged={setTimer}
                    isReady={ready}
                    onReadyChange={setReady}
                    readyPercentage={readyPercentage}
                    onNextClicked={nextRoomState}
                    onPrevClicked={prevRoomState}/>
            </div>
        </>
    );
};
export default ActiveRetro;

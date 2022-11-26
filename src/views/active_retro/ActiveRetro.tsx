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
import { Toolbox } from "../../component/toolbox/Toolbox";
import { useUser } from "../../context/UserContext.hook";
import { VoteView } from "./vote/VoteView";
import { RetroHeaderTracker } from "../../component/retro_header_tracker/RetroHeaderTracker";
import { DiscussView } from "./discuss/DiscussView";

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
            <Navbar topContent={timerEnds !== null && <Timer timerEnds={timerEnds}/>}><RetroHeaderTracker/></Navbar>

            <Routes>
                <Route path="reflection" element={<ReflectionView/>} />
                <Route path="group" element={<GroupView/>} />
                <Route path="vote" element={<VoteView/>} />
                <Route path="discuss" element={<DiscussView/>} />
                <Route path="*" element={<><ProgressBar/></>}/>
            </Routes>

            {/*<div className={styles.toolboxWrapper}>*/}
                <Toolbox
                    className={styles.toolbox}
                    isScrumMaster={isScrumMaster}
                    isVotingVisible={roomState == "vote"}
                    isFinishVisible={roomState == "discuss"}
                    onTimeChanged={setTimer}
                    isReady={ready}
                    onReadyChange={setReady}
                    readyPercentage={readyPercentage}
                    onNextClicked={nextRoomState}
                    onPrevClicked={prevRoomState}/>
            {/*</div>*/}
        </>
    );
};
export default ActiveRetro;

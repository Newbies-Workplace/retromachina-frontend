import React, {useEffect} from "react";
import styles from "./ActiveRetroView.module.scss"
import {Route, Routes} from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import {Timer} from "../../component/timer/Timer";
import {useRetro} from "../../context/RetroContext.hook";
import {Navigate, useNavigate} from "react-router";
import { ReflectionView } from "./reflection/ReflectionView";
import {GroupView} from "./group/GroupView";
import { Toolbox } from "../../component/toolbox/Toolbox";
import { useUser } from "../../context/UserContext.hook";
import { VoteView } from "./vote/VoteView";
import { RetroHeaderTracker } from "../../component/retro_header_tracker/RetroHeaderTracker";
import { DiscussView } from "./discuss/DiscussView";

const ActiveRetroView: React.FC = () => {
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
        const action = setTimeout(() => {
            navigate(`/retro/${retroId}/${roomState}`)
        }, 100)

        return () => {
            clearTimeout(action)
        }
    }, [roomState])

    return (
        <>
            <Navbar topContent={timerEnds !== null && <Timer timerEnds={timerEnds}/>}><RetroHeaderTracker/></Navbar>

            <Routes>
                <Route path="reflection" element={<ReflectionView/>} />
                <Route path="group" element={<GroupView/>} />
                <Route path="vote" element={<VoteView/>} />
                <Route path="discuss" element={<DiscussView/>} />
                <Route path="*" element={<Navigate to={"/404"}/>} />
            </Routes>

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
        </>
    );
};
export default ActiveRetroView;

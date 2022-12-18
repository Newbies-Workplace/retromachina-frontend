import React, {useEffect} from "react";
import styles from "./ActiveRetroView.module.scss"
import {Route, Routes} from "react-router-dom";
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
import {TeamAvatars} from "../../component/team_avatars/TeamAvatars";
import {ProgressBar} from "../../component/progress_bar/ProgressBar";

const ActiveRetroView: React.FC = () => {
    const navigate = useNavigate()
    const {
        timerEnds,
        roomState,
        retroId,
        setTimer,
        ready,
        setReady,
        activeUsers,
        teamUsers,
        readyPercentage,
        nextRoomState,
        prevRoomState,
    } = useRetro()
    const {isScrumMaster, user} = useUser()

    useEffect(() => {
        navigate(`/retro/${retroId}/${roomState}`)
    }, [roomState])

    return (
        <>
            <Navbar
                topContent={
                    <>
                        <TeamAvatars users={teamUsers.filter(u => u.user_id !== user!.user_id).map((user) => ({
                            id: user.user_id,
                            avatar_link: user.avatar_link,
                            isActive: activeUsers.some(socketUser => socketUser.id === user.user_id)
                        }))} />

                        {timerEnds !== null &&
                            <Timer timerEnds={timerEnds}/>
                        }
                    </>
                }>
                <RetroHeaderTracker/>
            </Navbar>

            <Routes>
                <Route path="reflection" element={<ReflectionView/>} />
                <Route path="group" element={<GroupView/>} />
                <Route path="vote" element={<VoteView/>} />
                <Route path="discuss" element={<DiscussView/>} />
                <Route path="*" element={<ProgressBar/>}/>
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

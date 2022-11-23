import React, {useEffect, useState} from "react";
import styles from "./ActiveRetro.module.scss"
import {Route, Routes} from "react-router-dom";
import {ProgressBar} from "../../component/progress_bar/ProgressBar";
import Navbar from "../../component/navbar/Navbar";
import {Timer} from "../../component/timer/Timer";
import {useRetro} from "../../context/RetroContext.hook";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";
import { ReflectionView } from "./reflection/ReflectionView";
import { Toolbox } from "../../component/toolbox/toolbox";
import { useUser } from "../../context/UserContext.hook";
import dayjs from "dayjs";

const ActiveRetro: React.FC = () => {
    const navigate = useNavigate()
    const {timerEnds, setReady, roomState, retroId} = useRetro()
    const [timeLeft, setTimeLeft] = useState<number | null>(null)
    const {isScrumMaster} = useUser()
    // to zmienia timer w navbarze
    useEffect(() => {
        
        console.log(timerEnds) 
        const counter = setInterval(() => {
                setTimeLeft(dayjs().diff(dayjs(timerEnds)))
            }, 1000)
        


        return () => {
            clearInterval(counter)
        }
    }, [timerEnds])

    // to zmienia etap pokoju
    useEffect(() => {
        navigate(`/retro/${retroId}/${roomState}`)
    }, [roomState])

    return (
        <>
            <Navbar topContent={timeLeft !== null && <Timer time={timeLeft}/>}/>
            

            <Routes>
                <Route path="reflection" element={<ReflectionView/>} />
                <Route path="group" element={<>group</>} />
                <Route path="vote" element={<>vote</>} />
                <Route path="discuss" element={<>discuss</>} />
                <Route path="*" element={<><ProgressBar/></>}/>
            </Routes>
            <div className={styles.toolboxWrapper}><Toolbox timeLeft={timeLeft} isScrumMaster={isScrumMaster} isVotingVisible={roomState=="vote"} isFinishVisible={roomState=="discuss"}/></div>
        </>
    );
};
export default ActiveRetro;

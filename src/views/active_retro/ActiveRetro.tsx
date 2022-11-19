import React, {useEffect, useState} from "react";

import {Route, Routes} from "react-router-dom";
import {ProgressBar} from "../../component/progress_bar/ProgressBar";
import Navbar from "../../component/navbar/Navbar";
import {Timer} from "../../component/timer/Timer";
import {useRetro} from "../../context/RetroContext.hook";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";

const ActiveRetro: React.FC = () => {
    const navigate = useNavigate()
    const {timerEnds, setReady, roomState, retroId} = useRetro()
    const [timeLeft, setTimeLeft] = useState<number | null>(null)

    // to zmienia timer w navbarze
    useEffect(() => {
        if (timerEnds !== null) {
            //todo licznik zmniejszający timeleft co sekundę (chyba useTimeout)
        }


        return () => {

        }
    }, [timerEnds])

    // to zmienia etap pokoju
    useEffect(() => {
        navigate(`/retro/${retroId}/${roomState}`)
    }, [roomState])

    return (
        <>
            <Navbar topContent={timeLeft !== null && <Timer time={timeLeft}/>}/>
            <Button onClick={() => {setReady(true)}}> hehe</Button>

            <Routes>
                <Route path="reflection" element={<>reflection</>} />
                <Route path="group" element={<>group</>} />
                <Route path="vote" element={<>vote</>} />
                <Route path="discuss" element={<>discuss</>} />
                <Route path="*" element={<><ProgressBar/></>}/>
            </Routes>
        </>
    );
};
export default ActiveRetro;

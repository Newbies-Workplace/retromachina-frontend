import React , { useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import {RetroContextProvider} from "../../context/RetroContext";
import {Navigate, useParams} from "react-router";

type RoomState = "reflection" | "group" | "vote" | "discuss";

const ActiveRetro: React.FC = () => {
    const { retroId } = useParams<{retroId: string}>();
    if (!retroId) {
        return <Navigate to={"/"}/>
    }

    const [roomState, setRoomState] = useState<RoomState>("reflection");
    const navigate = useNavigate();

    return (
        <RetroContextProvider retroId={retroId}>
            <Routes>
                <Route path="reflection" element />
                <Route path="group" element />
                <Route path="vote" element />
                <Route path="discuss" element />
                <Route path="*" element={<>Prr, płotka...</>}/>
            </Routes>
        </RetroContextProvider>
    );
};
export default ActiveRetro;

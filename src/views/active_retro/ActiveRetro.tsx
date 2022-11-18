import React , { useState } from "react";

import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";


type RoomState = "reflection" | "grouping" | "voting" | "discussing";

const ActiveRetro = () => {
  const [roomState, setRoomState] = useState<RoomState>("reflection");
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="reflection" element />

      <Route path="grouping" element />

      <Route path="voting" element />

      <Route path="discussing" element />
    </Routes>
  );
};
export default ActiveRetro;

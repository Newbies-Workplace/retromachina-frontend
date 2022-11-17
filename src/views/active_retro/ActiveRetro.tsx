import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import EditTeamView from '../../views/edit_team/EditTeamView';


const ActiveRetro = () => {
  const [roomState, setRoomState] = useState("");
  const navigate = useNavigate();
  
  useEffect(()=>{
    setRoomState("reflection");
    switch (roomState) {
        case "reflection":
        navigate("/reflection");
        break;
        case "grouping":
        navigate("/grouping");
        break;
        case "voting":
        navigate("/voting");
        break;
        case "discussing":
        navigate("/discussing");
        break;
  }
},[])



  return (
    <MemoryRouter>
        <Routes>
            <Route path="/reflection" element={<EditTeamView/>} />
            <Route path="/grouping" element={<EditTeamView/>} />
            <Route path="/voting" element={<EditTeamView/>} />
            <Route path="/discussing" element={<EditTeamView/>} />
            <Route path="*" element={<div>error</div>} />
        </Routes>
    </MemoryRouter>
  );
  
};
export default ActiveRetro;

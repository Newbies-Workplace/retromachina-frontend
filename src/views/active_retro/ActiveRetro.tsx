import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import EditTeamView from '../../views/edit_team/EditTeamView';

type RoomState = "reflection" | "grouping" | "voting" | "discussing";


const ActiveRetro = () => {
  const [roomState, setRoomState] = useState<RoomState>("reflection");
  const navigate = useNavigate();

    switch (roomState) {
      case "reflection":
        return <div>aaaa</div>
      case "grouping":
        return <div>aaaqwea</div>
      case "voting":
        return <div>aaewewaa</div>
      case "discussing":
        return <div>aaaqweqwea</div>
}

  
};
export default ActiveRetro;

import { Team } from "../../interfaces/Team.interface";
import { axiosInstance } from "../AxiosInstance";
import {Board} from "../../interfaces/Board.interface";

export const getTeamInfoByTeamId = async (teamId: string) => {
    return axiosInstance.get(`teams/${teamId}`)
        .then(res => res.data)
}

export const getInvitesInfoByTeamId = async (teamId: string) => {
    return axiosInstance.get(`invites?team_id=${teamId}`)
        .then(res => res.data);
}

export const createTeam = async (team: Team) => {
    return axiosInstance.post("teams", {
        name: team.name,
        emails: team.emails
    });
}

export const editBoard = async (teamId: string, board: Board) => {
    return axiosInstance.put(`teams/${teamId}/board`, board)
}

export const getBoard = async (teamId: string): Promise<Board> => {
    return axiosInstance.get<Board>(`teams/${teamId}/board`)
        .then(res => res.data)
}
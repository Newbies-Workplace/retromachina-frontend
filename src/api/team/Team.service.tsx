import {InviteResponse, TeamRequest, TeamResponse} from "./Team.interface";
import { axiosInstance } from "../AxiosInstance";

export const getTeamById = async (teamId: string): Promise<TeamResponse> => {
    return axiosInstance.get(`teams/${teamId}`)
        .then(res => res.data)
}

export const getInvitesByTeamId = async (teamId: string): Promise<InviteResponse[]> => {
    return axiosInstance.get(`invites?team_id=${teamId}`)
        .then(res => res.data);
}

export const createTeam = async (team: TeamRequest): Promise<TeamResponse> => {
    return axiosInstance.post("teams", {
        name: team.name,
        emails: team.emails
    }).then(res => res.data);
}
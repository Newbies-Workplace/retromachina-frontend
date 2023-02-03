import { Team } from "./Team.interface";
import { axiosInstance } from "../AxiosInstance";

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
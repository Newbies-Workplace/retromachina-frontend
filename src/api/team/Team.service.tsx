import { Team } from "../../interfaces/Team.interface";
import { axiosInstance } from "../AxiosInstance";

export const getTeamInfoByTeamId = async (teamId: string) => {
    return axiosInstance.get(`teams/${teamId}`);
}

export const getInvitesInfoByTeamId = async (teamId: string) => {
    return axiosInstance.get(`invites?team_id=${teamId}`);
}

export const createTeam = async (team: Team) => {
    return axiosInstance.post("teams", {
        name: team.name,
        emails: team.emails
    });
}
import { axiosInstance } from "../AxiosInstance";

export const getTeamInfoByTeamId = async (teamId: string) => {
    return axiosInstance.get(`teams/${teamId}`);
}    


export const getUsersInfoByTeamId = async (teamId: string) => {
    return axiosInstance.get(`users?team_id=${teamId}`);
}


export const getInvitesInfoByTeamId = async (teamId: string) => {
    return axiosInstance.get(`invites?team_id=${teamId}`);
}

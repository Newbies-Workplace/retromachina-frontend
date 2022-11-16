import { Team } from "../../interfaces/Team.interface";
import { axiosInstance } from "../AxiosInstance";

export const createTeam = async (team: Team) => {
    return axiosInstance.post("/teams", {
        name: team.name,
        emails: team.emails
    });
}
import { axiosInstance } from "../AxiosInstance"
import { RetroResponse } from "./Retro.interface"
import {Column} from "../../views/retro_create/RetroCreateView";

export const getRetrosByTeamId = (teamId: string): Promise<RetroResponse[]> => {
    return axiosInstance.get<RetroResponse[]>("retros", {
        params: {
            team_id: teamId
        }
    })
        .then(res => res.data)
}

export const getRetroByRetroId = (retroId: string) => {
    return axiosInstance.get<RetroResponse>(`retros/${retroId}`)
        .then(res => res.data);
}

export const createRetro = (teamId: string, columns: Column[]) => {
    return axiosInstance.post("/retros",{teamId, columns})
}
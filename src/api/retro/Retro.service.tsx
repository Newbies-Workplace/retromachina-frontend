import { axiosInstance } from "../AxiosInstance"
import { RetroResponse } from "./Retro.interface"

export const getRetrosByTeamId = (teamId: string): Promise<RetroResponse[]> => {
    return axiosInstance.get<RetroResponse[]>("/retros",{params:{
        team_id:teamId
    }})
    .then(res=>res.data)
}

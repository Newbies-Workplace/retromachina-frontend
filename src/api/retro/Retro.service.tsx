import { axiosInstance } from "../AxiosInstance"
import { RetroResponse } from "./Retro.interface"

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

//todo zweryfikujcie sobie czy tak będzie na backendzie (response też)
export const postRetro = (
    teamId: string,
    columns: { color: string, name: string, desc: string }[]
): Promise<RetroResponse> => {
    return axiosInstance.post<RetroResponse>("retros", {
        teamId: teamId,
        columns: columns,
    })
        .then(res => res.data)
}
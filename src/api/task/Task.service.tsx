import { axiosInstance } from "../AxiosInstance";

export const getTasksByRetroId = async (retroId: string) => {
    return axiosInstance.get(`tasks`, {
        params: {
            retro_id: retroId
        }
    }).then(res => res.data);
}
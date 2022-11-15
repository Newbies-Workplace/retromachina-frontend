import { axiosInstance } from "../AxiosInstance"
import { UserResponse } from "./User.interfaces"


export const getUserInfo = (): Promise<UserResponse> => {
    return axiosInstance.get<UserResponse>("users/@me")
    .then(res=>res.data)
}

import { axiosInstance } from "../AxiosInstance";
import { UserResponse } from "./User.interfaces";

export const getMyUser = (): Promise<UserResponse> => {
  return axiosInstance.get<UserResponse>("users/@me").then((res) => res.data);
};

//todo add metadata type
export const getUsersByTeamId = async (
  teamId: string
): Promise<UserResponse[]> => {
  return axiosInstance
    .get<UserResponse[]>(`users?team_id=${teamId}`)
    .then((res) => res.data);
};

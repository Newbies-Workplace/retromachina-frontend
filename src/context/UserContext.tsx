import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import { getUserInfo } from "../api/user/User.service";

export interface AuthParams {
    code: string,
    scope: string,
    authUser: string,
    prompt: string
}

interface UserContext {
    user: User | null,
    isScrumMaster: boolean,
    refreshUser: () => Promise<void>,
    login: (params: AuthParams) => Promise<void>
}

type User = {
    avatar_link: string,
    email: string,
    user_type: string,
    nick: string,
    teams: {
        name: string,
        id: string
    }[]
}

export const UserContext = createContext<UserContext>({
    user: null,
    isScrumMaster: false,
    refreshUser: () => { return Promise.reject() },
    login: () => { return Promise.reject() }
});

export const UserContextProvider: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const isScrumMaster = user?.user_type === "SCRUM_MASTER";

    useEffect(() => {
        const token = localStorage.getItem('Bearer');

        if (token && !user) {
            refreshUser();
        }
    },[])

    const refreshUser = () => {
        return getUserInfo()
            .then((response) => {
                setUser(response)
            })
            .catch((error) => {
                if (error.status == 401) {
                    setUser(null);
                } else {
                    console.error(error);
                }
            });
    }

    const login = (params: AuthParams) => {
        return axiosInstance.get("google/login", {
            params
        })
            .then((response) => {
                localStorage.setItem("Bearer", response.data.access_token);

                axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access_token;
                getUserInfo()
                    .then((response) => {
                        setUser(response);
                    });
            })
            .catch((err) => {
                // se napraw :)
                console.log(err);
            });
    }

    return(
        <UserContext.Provider
            value={{
                user: user,
                isScrumMaster: isScrumMaster,
                refreshUser: refreshUser,
                login: login,
            }}>
            {children}
        </UserContext.Provider>
    );
};
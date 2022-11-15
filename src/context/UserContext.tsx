import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";


interface Params {
    code: string,
    scope: string,
    authuser: string,
    prompt: string
}

interface UserContext {
    user: User | null,
    refreshUser(): Promise<void>,
    login(params: Object): Promise<void>
};


type User = {
    email: string,
    user_type: string,
    name: string,
    teams: {
            name: string,
            id: string
           }[]  
}

export const UserContext = createContext<UserContext>({
    user:null,
    refreshUser:() => { return Promise.reject() },
    login:()=>{return Promise.reject()}
});

export const UserContextProvider: React.FC<any> = ({ children }) => {

    const[user, setUser] = useState<User|null>(null);

    useEffect(() => {
        const token = localStorage.getItem('Bearer');


        if ( token ) {
            axiosInstance.get("users/@me")
                .then((response) => {
                    setUser(response.data)
                });
        }
    },[])

    const refreshUser = () => {
        return axiosInstance.get("users/@me")
            .then((response) => {
                setUser(response.data)
            });
    }

    const login = (params: Params) => {
        return axiosInstance.get("google/login", {
            params
        })
        .then((response) => {
            localStorage.setItem("Bearer", response.data.access_token);
            
            axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access_token;
            axiosInstance.get("users/@me")
                .then((response) => {
                    setUser(response.data);
                });
        })
        .catch((err) => {
            // se napraw :)
            console.log(err);
        });
    }

    return(
        <UserContext.Provider value={{user: user, refreshUser: refreshUser, login:login}}>
                {children}
        </UserContext.Provider>
    );
};
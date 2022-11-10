import { Children, createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../AxiosInstance";


interface UserContext {
    user: User | null,
    login(data: string): Promise<void>
};


type User = {
    user_type: string,
    name: string,
    teams: {
            name: string,
            id: string
           }[]  
}

export const UserContext = createContext<UserContext>({user:null,login:()=>{return Promise.reject()}});

export const UserContextProvider: React.FC<any> = ({ children }) => {
    const[user,setUser] = useState<User|null>(null);
    useEffect(() => {
        const token = localStorage.getItem('Bearer')
        if(token){
            axiosInstance.get("users/@me")
            .then(
                (response) => {
                    console.log(response)
                    setUser(response.data)
                    return response.data  
                }
            )  
        }
    },[])
    const login = (cookie :string): Promise<void> => {
        
        localStorage.setItem('Bearer',cookie);
        
        return axiosInstance.get("users/@me")
        .then(
            (response) => {
                console.log(response) 
                setUser(response.data)
                return response.data  
            }
        )
    }
    return(
        <UserContext.Provider value={{user: user,login:login}}>
                {children}
        </UserContext.Provider>
    );
};
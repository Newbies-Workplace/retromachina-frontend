export interface UserResponse{
    email: string,
    user_type: string,
    nick: string,
    teams: {
            name: string,
            id: string
           }[]  
}
export interface UserResponse{
    email: string,
    user_type: string,
    name: string,
    teams: {
            name: string,
            id: string
           }[]  
}
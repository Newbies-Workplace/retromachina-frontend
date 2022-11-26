export interface UserResponse {
    user_id: string,
    avatar_link: string,
    email: string,
    user_type: string,
    nick: string,
    teams: {
        name: string,
        id: string
    }[]
}
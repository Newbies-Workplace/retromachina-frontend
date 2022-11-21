export interface UserResponse {
    avatar_link: string,
    email: string,
    user_type: string,
    nick: string,
    teams: {
        name: string,
        id: string
    }[]
}
export interface TeamRequest {
    name: string
    emails: string[]
}

export interface TeamResponse {
    id: string
    name: string
    owner_id: string
}

export interface InviteResponse {
    email: string;
    team_id: string;
    role: string;
}
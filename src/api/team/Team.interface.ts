export interface TeamRequest {
    name: string
    emails: string[]
}

export interface TeamResponse {
    id: string
    name: string
    scrumMasterId: string
}
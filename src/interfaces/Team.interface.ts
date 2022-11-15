import { User } from "./User.interface"

export interface TeamInput {
    name: string,
    users: User[]
}

export interface TeamResult {
    name: string
    emails: string[]
}
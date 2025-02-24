import { Role } from "src/app/models/role"

export interface UserResponse {
    id: number
    full_name: string
    phone_number: string
    address: string
    active: boolean
    date_of_birth: Date
    facebook_account_id: string
    google_account_id: string
    role: Role
}
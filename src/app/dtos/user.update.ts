export interface UpdateUserDTO {
    full_name: string;
    phone_number: string
    address: string;
    password?: string;
    retype_password?: string;
    is_active?: boolean;
    date_of_birth: Date
    roles: string[]
}
// id: number
// full_name: string
// phone_number: string
// address: string
// active: boolean
// date_of_birth: Date
// facebook_account_id: string
// google_account_id: string
// role: Role
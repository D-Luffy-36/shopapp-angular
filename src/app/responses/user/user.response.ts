import { Role } from "src/app/models/role"

export interface UserResponse {
    id: number;
    full_name: string;
    phone_number: string;
    address: string;
    profile_image?: string;
    active: boolean;
    date_of_birth: Date;  // Dữ liệu ngày dạng string ISO
    facebook_account_id?: string;
    google_account_id?: string;
    roles: string[]; // Mảng chứa danh sách roles
}

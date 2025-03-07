import { UserResponse } from "./user.response";


export interface ListUserResponse {
    totalPages: number;
    users: UserResponse[];
}
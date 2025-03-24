import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from "src/app/responses/user/login.response";

@Injectable({
    providedIn: "root",
})


export class TokenService {
    private readonly ACCESS_TOKEN = "access_token";
    private readonly REFRESH_TOKEN = "refresh_token";
    private readonly TYPE_TOKEN = "type";


    private jwtHelper = new JwtHelperService(); // Khởi tạo JwtHelperService

    constructor() {

    }

    getToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    // lưu token local storage
    setToken(loginResponse: LoginResponse): void {
        localStorage.setItem(this.ACCESS_TOKEN, loginResponse.token);
        localStorage.setItem(this.REFRESH_TOKEN, loginResponse.refresh_token);
        localStorage.setItem(this.TYPE_TOKEN, loginResponse.token_type);

    }

    removeToken(): void {
        localStorage.removeItem(this.ACCESS_TOKEN)
    }

    getUserIdFromToken(): number | null {
        const token = this.getToken();  // Lấy token từ localStorage hoặc nguồn khác
        if (!token) return null;        // Nếu không có token, trả về null
        debugger;
        try {
            const userObject = this.jwtHelper.decodeToken(token); // Giải mã token
            debugger
            return userObject?.userId ? parseInt(userObject.userId) : null;
        } catch (error) {
            debugger
            console.error("Invalid token:", error);
            return null;
        }
    }

    isTokenExpired(): boolean {
        if (this.getToken() === null) {
            return false;
        }
        return this.jwtHelper.isTokenExpired(this.getToken());
    }
}
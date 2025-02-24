import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: "root",
})


export class TokenService {
    private readonly TOKEN_KEY = "access_token";
    private jwtHelper = new JwtHelperService(); // Khởi tạo JwtHelperService

    constructor() {

    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // lưu token local storage
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY)
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
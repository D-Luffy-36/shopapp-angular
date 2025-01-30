import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from "../service/user/token.service";


@Injectable({
    providedIn: "root",
})


export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }
    // đăng kí interceptor trong module

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        // Nếu có token, thêm vào header của request
        if (token) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(clonedReq);
        }
        return next.handle(req);
    }
}
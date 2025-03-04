import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../service/user/token.service';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService,
    private tokenService: TokenService,
    private router: Router) { }

  canActivate(): boolean {
    const user = this.userService.getUserFromLocalStorage();

    if (user && (user.role.name === 'user' || user.role.name === 'admin') && this.tokenService.getToken() && !this.tokenService.isTokenExpired()) {
      return true; // Nếu là user, cho phép truy cập
    } else {
      this.router.navigate(['/']); // Nếu không phải user, chuyển về trang chính
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { TokenService } from '../service/user/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const user = this.userService.getUserFromLocalStorage();

    if (!user || !Array.isArray(user.roles) || !this.tokenService.getToken() || this.tokenService.isTokenExpired()) {
      this.router.navigate(['/']);
      return false;
    }

    // Kiểm tra nếu user có ít nhất 1 role là 'ADMIN'
    const isAdmin = user.roles.some(role => role.toUpperCase() === 'ADMIN');

    if (!isAdmin) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

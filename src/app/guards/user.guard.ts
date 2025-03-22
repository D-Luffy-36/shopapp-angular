import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../service/user/token.service';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {


  // Danh sách role hợp lệ
  private allowedRoles = ['USER', 'ADMIN', 'STAFF'];

  constructor(private userService: UserService,
    private tokenService: TokenService,
    private router: Router) { }


  canActivate(): boolean {

    const user = this.userService.getUserFromLocalStorage();

    if (user && user.roles && this.tokenService.getToken() && !this.tokenService.isTokenExpired()) {
      const hasValidRole = user.roles.some(role => this.allowedRoles.includes(role.toUpperCase()));
      if (hasValidRole) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}

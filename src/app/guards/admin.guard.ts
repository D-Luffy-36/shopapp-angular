import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
  canActivate() {
    const user = this.userService.getUserFromLocalStorage();
    if (!user || user.role.name !== 'admin' || !this.tokenService.getToken() || this.tokenService.isTokenExpired()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}

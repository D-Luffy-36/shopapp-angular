import { Component, OnInit, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/service/user/token.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') header!: ElementRef; // Truy cập phần tử <header>
  user?: UserResponse;
  indexNav: Number;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.indexNav = 0;

  }

  ngOnInit(): void {
    let user = this.userService.getUserFromLocalStorage();
    if (!user) {
      return;
    }
    this.user = user;
  }

  activeClass(index: number) {
    setTimeout(() => {
      this.indexNav = index;
    }, 0);
  }



  // xóa hết token, user
  logout() {
    alert("logout!")
    this.userService.removeUserFromLocalStorge();
    this.tokenService.removeToken();
    this.router.navigate(["/login"]);
  }


  @HostListener("window:scroll", [])
  onWindownScroll() {
    if (window.scrollY > 50) {
      this.renderer.addClass(this.header.nativeElement, "scrolled")
    } else {
      this.renderer.removeClass(this.header.nativeElement, 'scrolled');
    }
  }
}
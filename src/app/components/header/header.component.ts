import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user?: UserResponse;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage() ?? undefined;
  }


  // xóa hết token, user
  logout() {
    alert("logout")
  }
}
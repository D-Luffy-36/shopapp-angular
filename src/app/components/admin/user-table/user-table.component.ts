import { Component, OnInit } from '@angular/core';
import { ListUserResponse } from 'src/app/responses/user/list.user.response';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  ngOnInit(): void {

  }
  users?: ListUserResponse;

  loadUser() {

  }
}

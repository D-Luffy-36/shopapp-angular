import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category/category.service';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    alert('Logout');
  }

}

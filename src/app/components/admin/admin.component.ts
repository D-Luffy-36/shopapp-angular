import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // Users
  newUsers: number = 56;
  totalUsers: number = 1234;

  // Products
  newProducts: number = 12;
  totalProducts: number = 789;

  // Orders
  newOrders: number = 34;
  totalOrders: number = 345;

  // Revenue
  newRevenue: number = 5000;
  totalRevenue: number = 100000;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  viewDetails(type: string, category: string): void {
    // Điều hướng đến trang chi tiết hoặc hiển thị modal
    console.log(`Viewing details for ${category} ${type}`);
    // Ví dụ: Điều hướng đến trang chi tiết
    this.router.navigate([`/details/${type}/${category}`]);
  }
}
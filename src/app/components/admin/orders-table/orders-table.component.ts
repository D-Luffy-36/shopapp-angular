import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/responses/api.response';
import { ListOrderResponse } from 'src/app/responses/order/list.order.response';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  listOrders?: ListOrderResponse;
  currentPage: number = 1;
  keyWord: string = "";
  totalPages: number = 0;
  pages: number[] = [];
  itemsPerPage: number = 10;

  visiblePages: number[] = []


  constructor(
    private router: Router,
    private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.loadOrders(this.keyWord, this.currentPage, this.itemsPerPage);
  }

  loadOrders(keyWord: string, page: number, limit: number) {
    this.orderService.getListOrder(keyWord, page, limit).subscribe({
      next: (response: ListOrderResponse) => {
        console.log(response);
        this.listOrders = response;
        this.listOrders.totalPages = response.totalPages;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  onPageChange(event: Event, page: number) {
    event.preventDefault();
    this.currentPage = page;
    this.loadOrders(this.keyWord, this.currentPage, this.itemsPerPage);
  }

  onclick(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }

  formatDateTime(dateValue: string | Date): string {
    const date = new Date(dateValue);
    return date.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }



  getStatusClass(status: string): string {
    if (!status) return 'bg-secondary text-white';
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-warning text-dark';
      case 'completed': return 'bg-success text-white';
      case 'cancelled': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  }
}

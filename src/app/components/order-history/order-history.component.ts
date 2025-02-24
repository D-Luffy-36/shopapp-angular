import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { ApiResponse } from 'src/app/responses/api.response';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/service/order.service';
import { TokenService } from 'src/app/service/user/token.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  userId?: number;
  orders: OrderResponse[] = []

  constructor(
    private router: Router,
    private tokeService: TokenService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokeService.getUserIdFromToken() ?? -1;
    if (this.userId < 0) {
      return;
    }

    this.orderService.getOrderByUserId(this.userId).subscribe({
      next: (listOrdersApiResponse: ApiResponse<OrderResponse[]>) => {

        console.log("list orders: ", listOrdersApiResponse.data);
        this.orders = listOrdersApiResponse.data;
      },
      error: (err) => {
        debugger
        console.log("err: ", err)
      }
    })
  }



  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-warning text-dark';
      case 'completed': return 'bg-success text-white';
      case 'cancelled': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  }

  formatDateTime(dateValue: string | Date): string {
    const date = new Date(dateValue);
    return date.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  onclick(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }

}

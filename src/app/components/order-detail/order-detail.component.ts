import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ApiResponse } from 'src/app/responses/api.response';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { CartService } from 'src/app/service/cart/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})

export class OrderDetailComponent implements OnInit {
  order?: OrderResponse;
  orderDetails: OrderResponse[] = [];

  private orderId: number = -1;
  imagePath = environment.productImgBase;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.orderId = Number(params.get('id'));
      console.log('Order ID:', this.orderId);
    });

    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: ApiResponse<OrderResponse>) => {
        console.log(response);
        this.order = response.data;
        this.order.order_details.map((item) => {
          item.product_thumbnail = this.imagePath + `/${item.product_thumbnail}`
        });
      },
      error: (err) => {
        debugger;
        console.log("error: " + err)
      }
    })
  }


}

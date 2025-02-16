import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ApiResponse } from 'src/app/responses/api.response';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { CartService } from 'src/app/service/cart/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})

export class OrderDetailComponent implements OnInit {
  order?: OrderResponse;

  private orderId = 39;
  imagePath = environment.imagePath;
  constructor(private orderService: OrderService) { }
  ngOnInit(): void {

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

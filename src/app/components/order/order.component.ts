import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/dtos/order.dto';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product/product.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import { TokenService } from 'src/app/service/user/token.service';
import { ApiResponse } from 'src/app/responses/api.response';
import { OrderResponse } from 'src/app/responses/order/order.response';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})


export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  cartItems: { product: Product, quantity: number }[] = [];
  productIds: string = "";
  totalPrice: number = 0;
  couponCode: string = "";
  orderData: OrderDTO = {
    user_id: 0, // Thay bằng user_id thích hợp
    full_name: 'noname', // Khởi tạo rỗng, sẽ được điền từ form
    email: "customer@gmail.com",
    phone_number: '1234567890',
    address: 'Q12, HCM',
    note: 'Xin nhẹ tay', // Có thể thêm trường ghi chú nếu cần
    total_money: this.totalPrice, // Sẽ được tính toán dựa trên giỏ hàng và mã giảm giá
    shipping_method: "Standard Shipping", // Giá trị mặc định
    payment_method: 'COD', // Giá trị mặc định
    coupon_code: this.couponCode, // Sẽ được điền từ form khi áp dụng mã giảm giá
    // thông tin để tạo order_detail
    cart_items: [] // Danh sách sản phẩm trong giỏ hàng
  }

  imagePath = environment.imagePath;
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService) {

  }

  ngOnInit(): void {
    // Lấy tất cả key của Map và chuyển thành mảng. => product id
    this.initOrderForm();

    const cart = this.cartService.getCart();
    console.log("cart: ", cart);

    this.productIds = Array.from(cart.keys())
      .map(value => String(value)) // Chuyển số thành chuỗi
      .join(","); // Nối bằng dấu phẩy
    //  this.productIds.split(",") =  ["1", "2"]

    if (this.productIds.length < 1) {
      return;
    }

    this.productService.getProductsDetailByIds(this.productIds).subscribe({
      next: (products: Product[]) => {
        this.cartItems = this.productIds.split(",").map((productId) => {
          const product = products.find((p) => p.id === Number(productId));
          if (product) {
            product.thumbnail = `${this.imagePath}/${product.thumbnail}`;
            console.log(product.thumbnail)
          }
          return {
            product: product!,
            quantity: cart.get(Number(productId))!
          };
        })
        this.calculatorTotal();
        this.orderData.total_money = this.totalPrice;
        // chuyển thành array + destructuring
        this.orderData.cart_items = Array.from(this.cartService.getCart(), ([product_id, quantity]) => {
          return ({ product_id, quantity })
        });
        console.log(this.orderData.cart_items);
      },
      error: (err) => {
        // debugger;
        console.log("error: " + err)
      }
    })


    // this.orderData.cart_items = this.cartItems.map((item) => ({
    //   product_id: item.product.id,
    //   quantity: item.quantity
    // }))
  }

  calculatorTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  }


  onOrderClick() {
    if (this.productIds === '') {
      alert("Cart is empty")
      return;
    }

    if (this.orderForm.valid) {
      console.log('Order:', this.orderForm.value);
      this.orderData = {
        ...this.orderData,        // Lấy tất cả thuộc tính cũ
        ...this.orderForm.value,   // Ghi đè thuộc tính trùng tên bằng giá trị mới từ form
        user_id: this.tokenService.getUserIdFromToken()
      };

      console.log(this.orderData)

      this.orderService.createOrder(this.orderData).subscribe({
        next: (response: ApiResponse<OrderResponse>) => {
          console.log("create order: ", response);
          alert("order successfully! Thank U so much")
          this.cartService.clearCart();
          this.router.navigate(["/orders/", response.data.id])

        },
        error: (err) => {
          debugger;
          console.log("error: " + err)
        }
      })
    } else {
      this.orderForm.markAllAsTouched();
      alert("Form not valid")
    }
  }

  initOrderForm() {
    this.orderForm = new FormGroup({
      full_name: new FormControl("noname", [Validators.required]),
      email: new FormControl("@gmail.com", [Validators.required, Validators.email]),
      address: new FormControl("", [Validators.required,]),
      phone_number: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      note: new FormControl("Fragile item please handle with care", []),
      shipping_method: new FormControl("Standard Shipping", [Validators.required,]),
      payment_method: new FormControl("COD", [Validators.required,]),
      coupon_code: new FormControl("", []),
    })
  }


  edit(productId: number) {
    this.router.navigate([`/detail-product/${productId}`]);
  }

  delete(productId: number) {

    // xóa phía UI
    this.cartItems = this.cartItems.filter((item) => {
      return item.product.id !== productId;
    })
    // xóa trong cart local storage
    this.cartService.removeFromCart(productId);
    this.calculatorTotal();
  }

}


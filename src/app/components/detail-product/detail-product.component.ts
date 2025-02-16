import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product/product.service';
import { CartService } from 'src/app/service/cart/cart.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
  amount: number = 0;
  product?: Product;
  productId: number = 3;
  imagePath = environment.imagePath;
  currentImageIndex: number = 0;
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    localStorage.setItem("access_token", environment.accessToken);
    this.getProductDetail(this.productId);
  }

  getProductDetail(productId: number) {
    this.productService.getProductsDetail(this.productId).subscribe({
      next: (product: Product) => {
        // this.product = response;
        // console.log(product);
        this.product = product;
        // bắt đầu với ảnh đầu tiên
        this.showImage(0);
      },
      error: (error: any) => {
        debugger;
        console.log("error: ", error)
      }
    })
  }

  showImage(index: number) {
    /// check index đầu vào
    if (this.product?.images &&
      this.product?.images?.length > 0) {
      // Đảm bảo index nằm trong khoảng hợp lệ        
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.images.length) {
        index = this.product.images.length - 1;
      }
      // Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }

  thumNailClick(index: number) {
    this.currentImageIndex = index;
    // console.log(index);
  }

  onClickIncrease() {
    this.amount++;
  }

  onClickReduce() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  previosImage() {
    if (this.currentImageIndex > 1) {
      this.currentImageIndex--;
    }
  }

  nextImage() {
    if (this.product?.images && this.currentImageIndex < this.product?.images?.length - 1) {
      this.currentImageIndex++;
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.amount);
    }
    else {
      console.log('can not add product to cart')
    }
  }



}

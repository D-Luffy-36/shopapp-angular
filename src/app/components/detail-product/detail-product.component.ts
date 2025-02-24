import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product/product.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
  amount: number = 1;
  product?: Product;
  productId: number = 0;
  imagePath = environment.imagePath;
  currentImageIndex: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService) { }

  ngOnInit() {
    // this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.params.subscribe(params => {
      this.productId = Number(params['id']);
    })


    this.getProductDetail(this.productId);
  }

  getProductDetail(productId: number) {
    this.productService.getProductsDetail(productId).subscribe({
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


  addToCart(productId: number, amount: number, showAlert: boolean = true) {
    this.cartService.addToCart(productId, amount)
    if (showAlert) {
      alert("add to cart successfully")
    }
  }


  buyNow(productId: number, amount: number) {
    this.addToCart(productId, amount, false);
    this.router.navigate(['/orders']);
  }


}

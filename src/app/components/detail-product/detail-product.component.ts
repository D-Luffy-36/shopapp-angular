import { Component, OnInit } from '@angular/core';
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
export class DetailProductComponent implements OnInit {
  amount: number = 1;
  product?: Product;
  productId: number = 0;
  imagePath = environment.productImgBase;
  currentImageIndex: number = 0;


  comments: { user: string; content: string; date: Date }[] = []; // Danh sách bình luận
  newComment: string = ''; // Nội dung bình luận mới

  // hộp chat
  isChatVisible: boolean = false;

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

    this.comments = [
      { user: 'Alice', content: 'Great product!', date: new Date() },
      { user: 'Bob', content: 'Fast delivery and good quality.', date: new Date() },
      { user: 'Messi', content: 'Great product!', date: new Date() },
      { user: 'Ronaldo', content: 'Fast delivery and good quality.', date: new Date() }
    ];
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

  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible;
  }


  addToCart(productId: number, amount: number, showAlert: boolean = true) {
    this.cartService.addToCart(productId, amount)
    if (showAlert) {
      alert("add to cart successfully")
    }
  }


  addComment(): void {
    if (this.newComment.trim()) {
      this.comments.push({
        user: 'Guest', // Giả lập tên người dùng
        content: this.newComment,
        date: new Date()
      });
      this.newComment = ''; // Xóa nội dung sau khi thêm
    } else {
      alert('Comment cannot be empty!');
    }
  }


  buyNow(productId: number, amount: number) {
    this.addToCart(productId, amount, false);
    this.router.navigate(['/orders']);
  }


}

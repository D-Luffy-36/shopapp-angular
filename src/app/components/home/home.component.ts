import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductResponse } from 'src/app/responses/product/list.product.response';
import { ProductService } from 'src/app/service/product/product.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = []
  pages: number[] = [];

  visiblePages: number[] = []
  currentPage: number = 1;
  itemsPerPage: number = 12;

  totalPages: number = 0;

  imagePath = environment.productImgBase;

  keyWord: string = "";
  selectedCategoryId: number = 0

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts(this.keyWord, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.getCategories();

  }

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword.trim(), selectedCategoryId, page, limit).subscribe({
      next: (response: ProductResponse) => {
        console.log(response);
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages)
      },
      error: (error: any) => {
        debugger;
        console.log("error: ", error)
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: Category[]) => {
        console.log(response);
        this.categories = response;
      },
      error: (error: any) => {
        debugger;
        console.log("error: ", error)
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyWord, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  onClickSearch() {
    this.currentPage = 1;
    this.itemsPerPage = 12;
    console.log("keyword: ", this.keyWord);
    console.log("category_id: ", this.selectedCategoryId);
    this.getProducts(this.keyWord, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
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


  detail(productId: number) {
    this.router.navigate([`/detail-product/${productId}`]);
  }

}

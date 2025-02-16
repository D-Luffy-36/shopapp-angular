

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { ProductService } from '../product/product.service';

@Injectable({
    providedIn: 'root'
})


export class CartService {
    // key: id product, value: số lượng sản phẩm đặt
    private cart: Map<number, number> = new Map();
    // load product từ localStorage
    constructor(private productService: ProductService) {

        // lấy dữ liệu giỏ hàng từ localStorage
        const storedCart = localStorage.getItem('cart');
        console.log("stored cart: " + storedCart);
        if (storedCart) {
            // this.cart =  JSON.parse(storedCart); sai vì đây là 1 mảng 
            this.cart = new Map(JSON.parse(storedCart));
            console.log("cart: ", this.cart);
        }
    }

    addToCart(productId: number, amount: number): void {
        if (!this.validProductId(productId) || !this.validAmount(amount)) {
            return;
        }
        // sản phẩm đã tồn tại trong giỏ hàng thêm sản phẩm vào quantity
        if (this.cart.has(productId)) {
            this.cart.set(productId, this.cart.get(productId)! + amount);
        } else {
            this.cart.set(productId, amount);
        }
        // lưu lại
        this.storeCartIntoLocalStorage();
    }

    removeFromCart(productId: number): void {
        if (!this.validProductId(productId)) {
            return;
        }
        if (this.cart?.has(productId)) {
            this.cart.delete(productId);
        }
        this.storeCartIntoLocalStorage();
    }


    clearCart(): void {

        this.cart.clear();
        this.storeCartIntoLocalStorage();
    }


    private storeCartIntoLocalStorage(): void {
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }

    private convertToMap(array: [number, number][]): Map<number, number> {
        return new Map(array);
    }



    validProductId(productId: number): boolean {
        return productId < 0 ? false : true;

    }

    validAmount(amount: number): boolean {
        return amount < 0 ? false : true;
    }

    getCart(): Map<number, number> {
        return this.cart;
    }

}


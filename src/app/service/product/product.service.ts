
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductResponse } from 'src/app/responses/product/product.response';

@Injectable({
    providedIn: 'root'
})


export class ProductService {
    private productUrl = environment.apiBaseUrl + "/products";
    constructor(private http: HttpClient) { };

    getProducts(keyWord: string, category_id: number, page: number, limit: number): Observable<ProductResponse> {
        const params = new HttpParams()
            .set('page', page)
            .set('limit', limit)
            .set('category_id', category_id)
            .set('keyWord', keyWord)
        return this.http.get<ProductResponse>(this.productUrl, { params: params });
    }
}



// export class RoleService {
//     private rolesUrl = environment.apiBaseUrl + "/roles"

//     constructor(private http: HttpClient) { };

//     getRoles(): Observable<ApiResponse<Role[]>> {
//         return this.http.get<ApiResponse<Role[]>>(this.rolesUrl);
//     }
// }
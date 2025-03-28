import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order.dto';
import { TokenService } from './user/token.service';
import { ApiResponse } from '../responses/api.response';
import { OrderResponse } from '../responses/order/order.response';
import { ListOrderResponse } from '../responses/order/list.order.response';

@Injectable({
    providedIn: 'root'
})

// Interceptor đã thêm token

export class OrderService {

    private orderUrl = environment.apiBaseUrl + "/orders";
    constructor(private http: HttpClient, private tokenService: TokenService) { }

    private createHeaders(): HttpHeaders {

        const token = this.tokenService.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        });
    }

    createOrder(orderData: OrderDTO): Observable<any> {
        const headers = this.createHeaders();
        return this.http.post<any>(this.orderUrl, orderData, { headers });
    }

    getOrderById(orderId: number): Observable<ApiResponse<OrderResponse>> {
        const url = this.orderUrl + `/${orderId}`;
        return this.http.get<ApiResponse<OrderResponse>>(url);
    }

    getOrderByUserId(userId: number): Observable<ApiResponse<OrderResponse[]>> {
        const url = this.orderUrl + `/users/${userId}`;
        return this.http.get<ApiResponse<OrderResponse[]>>(url);
    }

    getListOrder(keyWord: string, page: number, limit: number): Observable<ListOrderResponse> {
        const params = new HttpParams()
            .set('keyWord', keyWord)
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<ListOrderResponse>(this.orderUrl, { params });
    }


}


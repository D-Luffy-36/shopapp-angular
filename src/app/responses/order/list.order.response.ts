import { OrderResponse } from "./order.response";

export interface ListOrderResponse {
    totalPages: number;
    orders: OrderResponse[];
}
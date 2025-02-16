import { OrderDetailResponse } from "./order.detail.response";

export interface OrderResponse {
    created_at: Date;
    updated_at: Date;
    id: number;
    email: string;
    address: string;
    note: string;
    status: string;
    total_money: number;
    discount: number;
    active: boolean;
    user_id: number;
    full_name: string;
    phone_number: string;
    order_date: Date;
    shipping_method: string;
    payment_method: string;
    shipping_date: string;
    tracking_number: string | null;
    order_details: OrderDetailResponse[];
}
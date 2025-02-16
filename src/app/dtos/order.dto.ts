export class OrderDTO {
    user_id: number;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    total_money: number;
    payment_method: string;
    shipping_method: string;
    coupon_code: string;
    cart_items: any[];

    constructor() {
        this.user_id = 0; // Thay bằng user_id thích hợp
        this.full_name = ''; // Khởi tạo rỗng, sẽ được điền từ form
        this.email = '';
        this.phone_number = '';
        this.address = '';
        this.note = ''; // Có thể thêm trường ghi chú nếu cần
        this.total_money = 0; // Sẽ được tính toán dựa trên giỏ hàng và mã giảm giá
        this.payment_method = ''; // Mặc định là thanh toán khi nhận hàng (COD)
        this.shipping_method = ''; // Mặc định là vận chuyển nhanh (Express)
        this.coupon_code = ''; // Sẽ được điền từ form khi áp dụng mã giảm giá
        this.cart_items = []; // Danh sách sản phẩm trong giỏ hàng
    }
}

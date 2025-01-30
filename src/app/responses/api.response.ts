export class ApiResponse<T> {
    status: string;
    message: string;
    data: T;

    constructor(data: T, status: string, message: string) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

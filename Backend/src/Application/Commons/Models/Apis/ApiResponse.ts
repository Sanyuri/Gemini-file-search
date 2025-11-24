export class ApiResponse<T> {
    status: number;
    message: string;
    data: T | null;
    timestamp: Date;

    constructor(status: number, message: string, data: T | null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.timestamp = new Date();
    }
}
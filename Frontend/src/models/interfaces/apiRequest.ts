export class ApiRequest<T> {
    data: T;
    timestamp: Date; 

    constructor(data: T) {
        this.data = data;
        this.timestamp = new Date();
    }
}
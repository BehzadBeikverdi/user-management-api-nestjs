export class BaseResponseModel<T = any> {
    success: boolean;
    message: string;
    payload: T | null;
    errors: any[] | null;
    timestamp: string;

    constructor(
        success: boolean,
        message: string,
        payload: T | null = null,
        errors: any[] | null = null,
    ) {
        this.success = success;
        this.message = message;
        this.payload = payload;
        this.errors = errors;
        this.timestamp = new Date().toISOString(); // yyyy-MM-dd'T'HH:mm:ss.SSS
    }

    static success<T>(message: string, payload: T): BaseResponseModel<T> {
        return new BaseResponseModel<T>(true, message, payload, null);
    }

    static error(message: string, errors: any[]): BaseResponseModel<null> {
        return new BaseResponseModel<null>(false, message, null, errors);
    }
}

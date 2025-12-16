import { Response } from "express";
import { ApiResponse } from "../../Application/Commons/Models/Apis/ApiResponse";

export abstract class BaseController {

    protected ok<T>(res: Response, data: T | null, message: string) {
        const response: ApiResponse<T> = {
            status: 200,
            message: message,
            data: data,
            timestamp: new Date()
        };
        return res.status(200).json(response);
    }

    protected badRequest<T>(res: Response, message: string, data: T | null = null) {
        const response: ApiResponse<T> = {
            status: 400,
            message: message,
            data: data,
            timestamp: new Date()
        };
        return res.status(400).json(response);
    }

    protected notFound<T>(res: Response, message: string, data: T | null = null) {
        const response: ApiResponse<T> = {
            status: 404,
            message: message,
            data: data,
            timestamp: new Date()
        };
        return res.status(404).json(response);
    }

    protected internalError<T>(res: Response, message: string, data: T | null = null) {
        const response: ApiResponse<T> = {
            status: 500,
            message: message,
            data: data,
            timestamp: new Date()
        };
        return res.status(500).json(response);
    }
}

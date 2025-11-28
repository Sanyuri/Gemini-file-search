import { Response } from "express";
import { ApiResponse } from "../../Application/Commons/Models/Apis/ApiResponse";

export abstract class BaseController {

    protected ok<T>(res: Response, data: T | null, message: string) {
        return res.status(200).json(new ApiResponse(200, message, data));
    }

    protected badRequest<T>(res: Response, message: string, data: T | null = null) {
        return res.status(400).json(new ApiResponse(400, message, data));
    }

    protected notFound<T>(res: Response, message: string, data: T | null = null) {
        return res.status(404).json(new ApiResponse(404, message, data));
    }

    protected internalError<T>(res: Response, message: string, data: T | null = null) {
        return res.status(500).json(new ApiResponse(500, message, data));
    }
}

import { IUserService } from "../../Application/Commons/IServices/IUserService";
import { UserMapper } from "../../Application/Commons/Mappers/UserMapper";
import { ApiRequest } from "../../Application/Commons/Models/Apis/ApiRequest";
import { LoginModel } from "../../Application/Commons/Models/Users/LoginModel";
import { RegisterModel } from "../../Application/Commons/Models/Users/RegisterModel";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";

export class UserController extends BaseController {
    constructor(private userService: IUserService) { super(); }

    async login(req: Request, res: Response) {
        const data: ApiRequest<LoginModel> = req.body;
        if (!data.data.email || !data.data.password) {
            return this.badRequest<string>(res, "email and password are required.");
        }

        try {
            const token = await this.userService.login(data.data);
            return this.ok<string>(res, token, "Login successful.");
        } catch (error) {
            console.error("Error in login endpoint:", error);
            return this.internalError<Error>(res, "An error occurred while processing your request.", error as Error);
        }
    }

    async register(req: Request, res: Response) {
        const data: ApiRequest<RegisterModel> = req.body;

        if (!data.data.email || !data.data.password) {
            return this.badRequest<string>(res, "email and password are required.");
        }

        const newUser = await this.userService.register(data.data);
        return this.ok<ReturnType<typeof UserMapper.toDTO>>(res, newUser, "Registration successful.");
    }
}
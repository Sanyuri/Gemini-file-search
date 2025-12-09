import { IUserService } from "../../Application/Commons/IServices/IUserService";
import { FileSearchStoreMapper } from "../../Application/Commons/Mappers/FileSearchStoreMapper";
import { UserMapper } from "../../Application/Commons/Mappers/UserMapper";
import { ApiRequest } from "../../Application/Commons/Models/Apis/ApiRequest";
import { LoginModel } from "../../Application/Commons/Models/Users/LoginModel";
import { RegisterModel } from "../../Application/Commons/Models/Users/RegisterModel";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";

export class UserController extends BaseController {
    constructor(private userService: IUserService) { super(); }
    //#region Authentication
    async login(req: Request, res: Response) {
        const data: ApiRequest<LoginModel> = req.body;
        if (!data.data.email || !data.data.password) {
            return this.badRequest<string>(res, "email and password are required.");
        }

        try {
            const token = await this.userService.login(data.data);
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            return this.ok<string>(res, "", "Login successful.");
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

    async logout(req: Request, res: Response) {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        return this.ok<string>(res, "Logged out successfully.", "Logout successful.");
    }

    async getProfile(req: Request, res: Response) {
        const userId = req.body.id;

        try {
            const user = await this.userService.getById(userId);
            if (!user) {
                return this.notFound<string>(res, "User not found.");
            }
            return this.ok<ReturnType<typeof UserMapper.toDTO>>(res, user, "User profile retrieved successfully.");
        } catch (error) {
            console.error("Error in getProfile endpoint:", error);
            return this.internalError<Error>(res, "An error occurred while processing your request.", error as Error);
        }
    }
    //#endregion

    async getUserFileSearchStores(req: Request, res: Response) {
        const userId = req.body.id;
        try {
            const stores = await this.userService.getUserFileSearchStores(userId);
            return this.ok<ReturnType<typeof FileSearchStoreMapper.toDTO>[]>(res, stores, "User file search stores retrieved successfully.");
        } catch (error) {
            console.error("Error in getUserFileSearchStores endpoint:", error);
            return this.internalError<Error>(res, "An error occurred while processing your request.", error as Error);
        }
    }
}
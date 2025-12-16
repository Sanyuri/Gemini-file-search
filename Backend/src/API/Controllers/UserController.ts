import { IUserService } from "../../Application/Commons/IServices/IUserService";
import { ChatHistoryMapper } from "../../Application/Commons/Mappers/ChatHistoryMapper";
import { FileSearchStoreMapper } from "../../Application/Commons/Mappers/FileSearchStoreMapper";
import { SessionChatMapper } from "../../Application/Commons/Mappers/SessionChatMapper";
import { UserMapper } from "../../Application/Commons/Mappers/UserMapper";
import { ApiRequest } from "../../Application/Commons/Models/Apis/ApiRequest";
import { ChatHistoryModelRequest } from "../../Application/Commons/Models/QAModels/ChatHistoryModel";
import { LoginModel } from "../../Application/Commons/Models/Users/LoginModel";
import { RegisterModel } from "../../Application/Commons/Models/Users/RegisterModel";
import { AuthenticatedRequest } from "../Middlewares/JwtMiddleware";
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

    async getProfile(req: AuthenticatedRequest, res: Response) {
        const userId = req.user?.id;

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

    async getUserFileSearchStores(req: AuthenticatedRequest, res: Response) {
        const userId = req.user?.id;
        try {
            const stores = await this.userService.getUserFileSearchStores(userId);
            return this.ok<ReturnType<typeof FileSearchStoreMapper.toDTO>[]>(res, stores, "User file search stores retrieved successfully.");
        } catch (error) {
            console.error("Error in getUserFileSearchStores endpoint:", error);
            return this.internalError<Error>(res, "An error occurred while processing your request.", error as Error);
        }
    }

    async getUserSessionChats(req: AuthenticatedRequest, res: Response) {
        const userId = req.user?.id;
        try {
            const sessions = await this.userService.getUserSessionChats(userId);
            return this.ok<ReturnType<typeof SessionChatMapper.toDTO>[]>(res, sessions, "User session chats retrieved successfully.");
        } catch (error) {
            console.error("Error in getUserSessionChats endpoint:", error);
            return this.internalError<Error>(res, "An error occurred while processing your request.", error as Error);
        }
    }

    async getUserChatHistories(req: AuthenticatedRequest, res: Response) {
        const userId = req.user?.id;

        const data: ApiRequest<ChatHistoryModelRequest> = req.body;

        if(!data.data.sessionChatId) {
            return this.badRequest<string>(res, "sessionChatId is required.");
        }

        try {
            const chatHistories = await this.userService.getUserChatHistories(userId, data.data.sessionChatId);
            return this.ok<ReturnType<typeof ChatHistoryMapper.toDTO>[]>(res, chatHistories, "User chat histories retrieved successfully.");
        } catch (error) {
            console.error("Error in getUserChatHistories endpoint:", error);
            return this.internalError<Error>(res, "An error occurred while processing your request.", error as Error);
        }
    }
}
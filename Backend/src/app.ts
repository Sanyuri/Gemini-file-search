import cors from 'cors';
import express, { Application } from "express";
import { GeminiRepository } from "./Infrastructure/ExternalServices/GeminiService";
import { AskQuestionService } from "./Application/Services/AskQuestionService";
import { createFileStoreRouter, createQaRouter, createUserRouter } from "./API/Routes/Routes";
import { FileStoreService } from "./Application/Services/FileStoreService";
import { ChatHistoryRepository } from './Infrastructure/Repositories/ChatHistoryRepository';
import { UserRepository } from './Infrastructure/Repositories/UserRepository';
import { SessionChatRepository } from './Infrastructure/Repositories/SessionChatReoisitory';
import { UserService } from './Application/Services/UserService';
import { Jwt } from './Application/Commons/Utilities/Jwt';
import cookieParser from 'cookie-parser';
import { FileSearchStoreRepository } from './Infrastructure/Repositories/FileSearchStoreRepository';

const geminiApiKey = process.env.GEMINI_API_KEY || "";
if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const frontendUrl = process.env.FRONTEND_URL || "";
if (!frontendUrl) {
    throw new Error("FRONTEND_URL is not set in environment variables.");
}

export const createApp = () => {
    const app: Application = express();

    app.use(cors({
        origin: frontendUrl,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization",
        credentials: true,
    }));

    const userRepository = new UserRepository();
    const sessionChatRepository = new SessionChatRepository();
    const chatHistoryRepository = new ChatHistoryRepository();
    const geminiRepository = new GeminiRepository(geminiApiKey);
    const fileSearchStoreRepository = new FileSearchStoreRepository();

    const jwt = new Jwt();
    const qaService = new AskQuestionService(userRepository, geminiRepository, chatHistoryRepository, sessionChatRepository);
    const userService = new UserService(jwt, userRepository, fileSearchStoreRepository, sessionChatRepository, chatHistoryRepository);
    const fileStoreService = new FileStoreService(geminiRepository, userRepository, fileSearchStoreRepository);
    const qaRouter = createQaRouter(qaService);
    const userRouter = createUserRouter(userService);

    const fileStoreRouter = createFileStoreRouter(fileStoreService);

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/files', express.static('files'));

    app.use("/api/users", userRouter)
    app.use("/api/qa", qaRouter);
    app.use("/api/file-store", fileStoreRouter);

    app.use((_, res) => {
        res.status(404).json({ error: "Endpoint not found" });
    });

    return app;
};


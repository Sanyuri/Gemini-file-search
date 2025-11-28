import cors from 'cors';
import express, { Application } from "express";
import { GeminiRepository } from "./Infrastructure/ExternalService/GeminiService";
import { AskQuestionService } from "./Application/Services/AskQuestionService";
import { createFileStoreRouter, createQaRouter } from "./API/Routes/Routes";
import { FileStoreService } from "./Application/Services/FileStoreService";

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

    const geminiRepository = new GeminiRepository(geminiApiKey);
    const qaService = new AskQuestionService(geminiRepository);
    const fileStoreService = new FileStoreService(geminiRepository);
    const qaRouter = createQaRouter(qaService);
    const fileStoreRouter = createFileStoreRouter(fileStoreService);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/files', express.static('files'));

    app.use("/api/qa", qaRouter);
    app.use("/api/file-store", fileStoreRouter);

    app.use((_, res) => {
        res.status(404).json({ error: "Endpoint not found" });
    });

    return app;
};

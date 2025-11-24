import { GeminiResponse } from "../Models/GeminiResponse";

export interface IGeminiRepository {
    queryFileSearch(questionText: string, fileSearchStoreName: string): Promise<GeminiResponse>;

    uploadFile(filePath: string, mimeType: string, fileName: string): Promise<{ name: string }>;
    deleteFile(fileName: string, fileSearchStoreName: string): Promise<void>;

    createStore(displayName: string): Promise<{ name: string }>;
    addFileToStore(fileName: string, fileSearchStoreName: string): Promise<{ name: string }>;
    deleteStore(fileSearchStoreName: string): Promise<void>;
}
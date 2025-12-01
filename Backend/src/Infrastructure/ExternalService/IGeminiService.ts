import { Document, FileSearchStore, Pager } from "@google/genai";
import { GeminiResponse } from "../Models/GeminiResponse";

export interface IGeminiRepository {
    queryFileSearch(questionText: string, fileSearchStoreName: string): Promise<GeminiResponse>;

    listStores(pageSize: number | undefined, pageToken: string | undefined): Promise<Pager<FileSearchStore>>;
    getStoreInfo(storeName: string): Promise<FileSearchStore>;

    uploadFile(filePath: string, mimeType: string, fileName: string): Promise<{ name: string }>;
    deleteFile(fileName: string): Promise<void>;
    getFileInfo(fileName: string): Promise<Document>;
    listFilesInStore(fileSearchStoreName: string, pageSize: number, pageToken?: string): Promise<Pager<Document>>;

    createStore(displayName: string): Promise<FileSearchStore>;
    addFileToStore(fileName: string, fileSearchStoreName: string): Promise<{ name: string }>;
    deleteStore(fileSearchStoreName: string): Promise<void>;
}
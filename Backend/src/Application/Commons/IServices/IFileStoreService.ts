import { FileSearchStore as FileSearchStoreGemini, Pager } from "@google/genai"
import { FileSearchStore } from "../../../Infrastructure/Models/FileSearchStore";
import { MulterFile } from "../Models/MulterFiles/MulterFile";

export interface IFileStoreService {
    ListStores(pageSize: number | undefined, pageToken: string | undefined): unknown;
    GetStoreInfo(storeName: string): Promise<FileSearchStoreGemini>;
    CreateStore(storeName: string): Promise<FileSearchStoreGemini>;
    UploadFilesToStore(files: MulterFile[], storeName: string): Promise<FileSearchStore>;
    DeleteStore(storeName: string): Promise<void>;
    DeleteFile(fileName: string): Promise<void>;
    GetFileInfo(fileName: string): Promise<FileSearchStoreGemini>;
    ListFilesInStore(fileSearchStoreName: string, pageSize: number, pageToken?: string): Promise<Pager<FileSearchStoreGemini>>;
}
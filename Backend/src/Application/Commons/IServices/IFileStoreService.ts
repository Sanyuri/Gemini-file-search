import { FileSearchStore as FileSearchStoreGemini, Pager } from "@google/genai"
import { UploadedFileRecord } from "../../../Infrastructure/Models/UploadedFileRecord";
import { MulterFile } from "../Models/MulterFiles/MulterFile";

export interface IFileStoreService {
    ListStores(pageSize: number | undefined, pageToken: string | undefined): unknown;
    GetStoreInfo(storeName: string): Promise<FileSearchStoreGemini>;
    CreateStore(userId: string, storeName: string): Promise<FileSearchStoreGemini>;
    UploadFilesToStore(files: MulterFile[], storeName: string): Promise<UploadedFileRecord>;
    DeleteStore(storeName: string): Promise<void>;
    DeleteFile(fileName: string): Promise<void>;
    GetFileInfo(fileName: string): Promise<FileSearchStoreGemini>;
    ListFilesInStore(fileSearchStoreName: string, pageSize: number, pageToken?: string): Promise<Pager<FileSearchStoreGemini>>;
}
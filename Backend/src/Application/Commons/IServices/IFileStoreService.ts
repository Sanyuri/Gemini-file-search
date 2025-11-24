import { FileSearchStore } from "../../../Infrastructure/Models/FileSearchStore";
import { MulterFile } from "../Models/MulterFiles/MulterFile";

export interface IFileStoreService {
    CreateStore(storeName: string): Promise<{ name: string; }>;
    UploadFilesToStore(files: MulterFile[], storeName: string): Promise<FileSearchStore>;
    DeleteStore(storeName: string): Promise<void>;
    DeleteFile(fileName: string, fileSearchStoreName: string): Promise<void>;
}
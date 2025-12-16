import { FileSearchStore as FileSearchStoreGemini, Pager } from "@google/genai"
import { UploadedFileRecord } from "../../../Infrastructure/Models/UploadedFileRecord";
import { MulterFile } from "../Models/MulterFiles/MulterFile";
import { PagerResonse } from "../Models/Pagers/PagerResonse";
import { FileSearchStoreMapper } from "../Mappers/FileSearchStoreMapper";
import { FileMapper } from "../Mappers/FileMapper";

export interface IFileStoreService {
    ListStores(pageSize: number | undefined, pageToken: string | undefined): Promise<PagerResonse<FileSearchStoreMapper>>;
    GetStoreInfo(storeName: string): Promise<ReturnType<typeof FileMapper.toDTO>>;
    CreateStore(userId: string, storeName: string): Promise<FileSearchStoreGemini>;
    UploadFilesToStore(files: MulterFile[], storeName: string): Promise<UploadedFileRecord>;
    DeleteStore(storeName: string): Promise<void>;
    DeleteFile(fileName: string): Promise<void>;
    GetFileInfo(fileName: string): Promise<ReturnType<typeof FileMapper.toDTO>>;
    ListFilesInStore(fileSearchStoreName: string, pageSize: number, pageToken?: string): Promise<PagerResonse<FileSearchStoreMapper>>;
}
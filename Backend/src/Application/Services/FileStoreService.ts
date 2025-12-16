import { IGeminiRepository } from "../../Infrastructure/ExternalServices/IGeminiService";
import { UploadedFileRecord } from "../../Infrastructure/Models/UploadedFileRecord";
import { FileSearchStore as FileSearchStoreGemini, Pager } from "@google/genai"
import { IFileStoreService } from "../Commons/IServices/IFileStoreService";
import { MulterFile } from "../Commons/Models/MulterFiles/MulterFile";
import { UserRepository } from "../../Infrastructure/Repositories/UserRepository";
import { FileSearchStore } from "../../Domain/Entities/FileSearchStore";
import { FileSearchStoreRepository } from "../../Infrastructure/Repositories/FileSearchStoreRepository";
import { FileSearchStoreMapper } from "../Commons/Mappers/FileSearchStoreMapper";
import { PagerResonse } from "../Commons/Models/Pagers/PagerResonse";
import { FileModelResponse } from "../Commons/Models/FileSearchStores/FileModel";
import { FileMapper } from "../Commons/Mappers/FileMapper";

export class FileStoreService implements IFileStoreService {
    constructor(private readonly GeminiRepository: IGeminiRepository,
        private UserRepository: UserRepository,
        private readonly FileRepository: FileSearchStoreRepository) { }

    //#region File Search Store Methods
    /**
     * Create a new file search store
     * @param storeName - The name of the store to create.
     * @returns An object containing the name of the created store.
     */
    async CreateStore(userId: string, storeName: string): Promise<FileSearchStoreGemini> {

        const createdStore = await this.GeminiRepository.createStore(storeName);
        if (userId) {
            const currentUser = await this.UserRepository.findById(userId);
            if (!currentUser) {
                throw new Error("User not found");
            }
            await this.FileRepository.save(
                new FileSearchStore(createdStore.name!, createdStore.displayName!, currentUser, currentUser.email, createdStore.sizeBytes));
        }
        return createdStore;
    }

    /**
    * List all file search stores
    * @param pageSize - The number of stores to return per page.
    * @param pageToken - The token for the page to retrieve.
    * @returns A promise that resolves to a Pager object containing FileSearchStore objects.
    */
    async ListStores(pageSize: number | undefined, pageToken: string | undefined): Promise<PagerResonse<FileSearchStoreMapper>> {
        const stores = await this.GeminiRepository.listStores(pageSize, pageToken);
        const items = stores.page.map(store => ({
            id: store.name,
            storeName: store.displayName,
            createTime: store.createTime,
            updateTime: store.updateTime,
        }));
        return {
            items: items,
            pagination: {
                pageSize: stores.params.config?.pageSize,
                nextPageToken: stores.params.config?.pageToken
            }
        };
    }

    /**
     * Upload files to a file search store
     * @param files - The files to upload.
     * @param storeName - The name of the store to upload files to.
     * @returns A FileSearchStore object containing details of the uploaded files.
     */
    async UploadFilesToStore(files: MulterFile[], storeName: string): Promise<UploadedFileRecord> {
        const uploadedFileNames: string[] = [];
        for (const file of files) {
            const filePath = file.path;
            const mimeType = file.mimetype;
            const displayName = file.filename;
            const uploadResult = await this.GeminiRepository.uploadFile(filePath, mimeType, displayName);
            uploadedFileNames.push(uploadResult.name);
        }

        const uploadedDocumentNames: string[] = [];

        for (const fileName of uploadedFileNames) {
            const documentName = await this.GeminiRepository.addFileToStore(fileName, storeName);
            uploadedDocumentNames.push(documentName.name);
        }

        return {
            storeName: storeName,
            fileNames: uploadedDocumentNames,
            operationName: "UploadAndCreateStore"
        };
    }

    /**
     * Delete a file search store
     * @param storeName - The name of the store to delete.
     * @returns A promise that resolves when the store is deleted.
     */
    async DeleteStore(storeName: string): Promise<void> {
        await this.GeminiRepository.deleteStore(storeName);
    }
    //#endregion

    //#region File Methods
    /**
     * Delete a file from a file search store
     * @param fileName - The name of the file to delete.
     * @returns A promise that resolves when the file is deleted.
     */
    async DeleteFile(fileName: string): Promise<void> {
        await this.GeminiRepository.deleteFile(fileName);
    }

    /**
     * Get information about a file search store
     * @param storeName - The name of the store to retrieve information for.
     * @returns A promise that resolves to a FileSearchStore object containing store information.
     */
    async GetStoreInfo(storeName: string): Promise<ReturnType<typeof FileMapper.toDTO>> {
        const storeInfo = await this.GeminiRepository.getStoreInfo(storeName);
        return FileMapper.toDTO(storeInfo);
    }

    /**
     * Get information about a file in a file search store
     * @param fileName - The name of the file to retrieve information for.
     * @returns A promise that resolves to a Document object containing file information.
     */
    async GetFileInfo(fileName: string): Promise<ReturnType<typeof FileMapper.toDTO>> {
        const fileInfo = await this.GeminiRepository.getFileInfo(fileName);
        return FileMapper.toDTO(fileInfo);
    }

    /**
     * Get all files in a file search store
     * @param fileSearchStoreName - The name of the file search store.
     * @param pageSize - The number of files to return per page.
     * @param pageToken - The token for the page to retrieve.
     * @returns A promise that resolves to a Pager object containing Document objects.
     */
    async ListFilesInStore(fileSearchStoreName: string, pageSize: number, pageToken?: string): Promise<PagerResonse<FileModelResponse>> {
        const files = await this.GeminiRepository.listFilesInStore(fileSearchStoreName, pageSize, pageToken);
        const items = files.page.map(file => ({
            id: file.name,
            displayName: file.displayName,
            sizeBytes: file.sizeBytes,
            mimeType: file.mimeType,
            createTime: file.createTime!,
            updateTime: file.updateTime!,
        }));
        return {
            items: items,
            pagination: {
                pageSize: files.params.config?.pageSize,
                nextPageToken: files.params.config?.pageToken
            }
        };
    }
    //#endregion
}
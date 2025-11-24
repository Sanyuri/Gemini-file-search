import { IGeminiRepository } from "../../Infrastructure/ExternalService/IGeminiService";
import { FileSearchStore } from "../../Infrastructure/Models/FileSearchStore";
import { IFileStoreService } from "../Commons/IServices/IFileStoreService";
import { MulterFile } from "../Commons/Models/MulterFiles/MulterFile";

export class FileStoreService implements IFileStoreService {
    constructor(private readonly GeminiRepository: IGeminiRepository) { }

    /**
     * Create a new file search store
     * @param storeName - The name of the store to create.
     * @returns An object containing the name of the created store.
     */
    async CreateStore(storeName: string): Promise<{ name: string; }> {
        return await this.GeminiRepository.createStore(storeName);
    }

    /**
     * Upload files to a file search store
     * @param files - The files to upload.
     * @param storeName - The name of the store to upload files to.
     * @returns A FileSearchStore object containing details of the uploaded files.
     */
    async UploadFilesToStore(files: MulterFile[], storeName: string): Promise<FileSearchStore> {
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

    /**
     * Delete a file from a file search store
     * @param fileName - The name of the file to delete.
     * @param fileSearchStoreName - The name of the file search store.
     * @returns A promise that resolves when the file is deleted.
     */
    async DeleteFile(fileName: string, fileSearchStoreName: string): Promise<void> {
        await this.GeminiRepository.deleteFile(fileName, fileSearchStoreName);
    }
}
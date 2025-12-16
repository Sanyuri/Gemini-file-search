import { Request, Response } from "express";
import { FileSearchStoreModel } from "../../Application/Commons/Models/FileSearchStores/FileSearchStoreModel";
import { IFileStoreService } from "../../Application/Commons/IServices/IFileStoreService";
import { BaseController } from "./BaseController";
import { MulterFile } from "../../Application/Commons/Models/MulterFiles/MulterFile";
import { ApiRequest } from "../../Application/Commons/Models/Apis/ApiRequest";
import { FileModelRequest } from "../../Application/Commons/Models/FileSearchStores/FileModel";
import { FileSearchStore } from "@google/genai";
import { CreateFileStoreModel } from "../../Application/Commons/Models/FileSearchStores/CreateFileStoreModel";

export class FileController extends BaseController {
    constructor(private fileStoreService: IFileStoreService) { super(); }

    /**
     * Create a new file search store
     * @param req - The request object containing the store name.
     * @param res - The response object to send the result.
     * @returns A success message or an error.
     */
    async createFileSearchStore(req: Request, res: Response) {

        const data: ApiRequest<CreateFileStoreModel> = req.body;

        if (!data.data.storeName) {
            return this.badRequest<FileSearchStoreModel>(res, "storeName is required.");
        }

        try {
            const fileStore = await this.fileStoreService.CreateStore(data.data.userId, data.data.storeName);
            return this.ok<FileSearchStore>(res, fileStore, `File search store ${fileStore.name} created successfully.`);
        } catch (error) {
            console.error("Error in createFileSearchStore endpoint:", error);
            return this.internalError<string>(res, `An error occurred while creating the file search store ${req.body.storeName}.`);
        }
    }

    /**
     * Delete a file search store
     * @param req - The request object containing the store name.
     * @param res - The response object to send the result.
     * @returns A success message or an error.
     */
    async deleteFileSearchStore(req: Request, res: Response) {

        const storeName = req.query.storeName as string;

        if (!storeName) {
            return this.badRequest<string>(res, "storeName is required.");
        }

        try {
            await this.fileStoreService.DeleteStore(storeName);
            return this.ok<string>(res, null, `File search store ${storeName} deleted successfully.`);
        } catch (error) {
            console.error("Error in deleteFileSearchStore endpoint:", error);
            return this.internalError<string>(res, `An error occurred while deleting the file search store ${storeName}.`);
        }
    }

    /**
     * Upload files to a file search store
     * @param req - The request object containing the store name and files.
     * @param res - The response object to send the result.
     * @returns A success message or an error.
     */
    async uploadFilesToStore(req: Request, res: Response) {

        if (!req.body.storeName || !req.files) {
            return this.badRequest<string>(res, "storeName and files are required.");
        }

        // Normalize req.files which can be either File[] or { [fieldname: string]: File[] }
        const files: Express.Multer.File[] = req.files instanceof Array
            ? req.files
            : Object.values(req.files).flat();

        const multerFiles: MulterFile[] = files.map(file => ({
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            destination: file.destination,
            filename: file.filename,
            path: file.path,
            size: file.size
        }));

        try {
            const result = await this.fileStoreService.UploadFilesToStore(multerFiles, req.body.storeName);
            const fileNames = result.fileNames.join(", ");
            return this.ok<string>(res, fileNames, `Files ${fileNames} uploaded successfully.`);
        } catch (error) {
            console.error("Error in uploadFilesToStore endpoint:", error);
            return this.internalError<string>(res, `An error occurred while uploading files to the store ${req.body.storeName}.`);
        }
    }

    /**
     * Delete a file from a file search store
     * @param req - The request object containing the file name and store name.
     * @param res - The response object to send the result.
     * @returns A success message or an error.
     */
    async deleteFile(req: Request, res: Response) {

        const fileName = req.query.fileName as string;

        if (!fileName) {
            return this.badRequest<string>(res, "fileName is required.");
        }

        try {
            await this.fileStoreService.DeleteFile(fileName);
            return this.ok<string>(res, null, "File deleted successfully.");
        } catch (error) {
            console.error("Error in deleteFile endpoint:", error);
            return this.internalError<string>(res, `An error occurred while deleting the file ${fileName}.`);
        }
    }

    /**
     * Get information about a file search store
     * @param req - The request object containing the store name.
     * @param res - The response object to send the result.
     * @returns A success message or an error.
     */
    async getFileSearchStoreInfo(req: Request, res: Response) {
        const storeName = req.query.storeName as string;

        if (!storeName) {
            return this.badRequest<FileSearchStoreModel>(res, "storeName is required.");
        }

        try {
            const storeInfo = await this.fileStoreService.GetStoreInfo(storeName);
            return this.ok<any>(res, storeInfo, `File search store info for ${storeName} retrieved successfully.`);
        } catch (error) {
            console.error("Error in getFileSearchStoreInfo endpoint:", error);
            return this.internalError<string>(res, `An error occurred while retrieving info for the file search store ${storeName}.`);
        }
    }

    /**
     * List all file search stores
     * @param req - The request object.
     * @param res - The response object to send the result.
     * @returns A list of file search stores or an error.
     */
    async listFileSearchStores(req: Request, res: Response) {
        const { pageSize, pageToken } = req.query as { pageSize: string; pageToken?: string };
        if (!pageSize || isNaN(Number(pageSize))) {
            return this.badRequest<string>(res, "pageSize is required.");
        }
        try {
            const stores = await this.fileStoreService.ListStores(Number(pageSize), pageToken);
            return this.ok<any>(res, stores, "File search stores retrieved successfully.");
        } catch (error) {
            console.error("Error in listFileSearchStores endpoint:", error);
            return this.internalError<string>(res, "An error occurred while listing the file search stores.");
        }
    }

    /**
     * Get information about a file in a file search store
     * @param req - The request object containing the file name and store name.
     * @param res - The response object to send the result.
     * @returns A success message or an error.
     */
    async getFileInfo(req: Request, res: Response) {
        const { fileName } = req.query as { fileName: string };

        if (!fileName) {
            return this.badRequest<string>(res, "fileName is required.");
        }
        try {
            const fileInfo = await this.fileStoreService.GetFileInfo(fileName);
            return this.ok<any>(res, fileInfo, `File info for ${fileInfo.displayName} retrieved successfully.`);
        }
        catch (error) {
            console.error("Error in getFileInfo endpoint:", error);
            return this.internalError<string>(res, `An error occurred while retrieving info for the file ${fileName}.`);
        }
    }

    /**
     * Get all files in a file search store
     * @param req - The request object containing the store name, page size, and page token.
     * @param res - The response object to send the result.
     * @return A list of files or an error.
     */
    async listFilesInStore(req: Request, res: Response) {
        const { storeName, pageSize, pageToken } = req.query as { storeName: string; pageSize: string; pageToken?: string };
        if (!storeName || !pageSize || isNaN(Number(pageSize))) {
            return this.badRequest<string>(res, "storeName and valid pageSize are required.");
        }
        try {
            const files = await this.fileStoreService.ListFilesInStore(storeName, Number(pageSize), pageToken);
            return this.ok<any>(res, files, `Files in store ${storeName} retrieved successfully.`);
        } catch (error) {
            console.error("Error in listFilesInStore endpoint:", error);
            return this.internalError<string>(res, `An error occurred while listing files in the store ${storeName}.`);
        }
    }
}
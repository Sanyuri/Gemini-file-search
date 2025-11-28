import { Request, Response } from "express";
import { FileSearchStoreModel } from "../../Application/Commons/Models/FileSearchStores/FileSearchStoreModel";
import { IFileStoreService } from "../../Application/Commons/IServices/IFileStoreService";
import { BaseController } from "./BaseController";
import { MulterFile } from "../../Application/Commons/Models/MulterFiles/MulterFile";
import { ApiRequest } from "../../Application/Commons/Models/Apis/ApiRequest";
import { DeleteFileModel } from "../../Application/Commons/Models/FileSearchStores/DeleteFileModel";

export class FileController extends BaseController {
    constructor(private fileStoreService: IFileStoreService) { super(); }

    /**
     * Create a new file search store
     * @param req - The request object containing the store name.
     * @param res - The response object to send the result.
     * @returns A success message or an error.
     */
    async createFileSearchStore(req: Request, res: Response) {

        const data: ApiRequest<FileSearchStoreModel> = req.body;

        if (!data.data.storeName) {
            return this.badRequest<FileSearchStoreModel>(res, "storeName is required.");
        }

        try {
            const fileStore = await this.fileStoreService.CreateStore(data.data.storeName);
            return this.ok<string>(res, fileStore.name, `File search store ${fileStore.name} created successfully.`);
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

        const data: ApiRequest<FileSearchStoreModel> = req.body;

        if (!data.data.storeName) {
            return this.badRequest<string>(res, "storeName is required.");
        }

        try {
            await this.fileStoreService.DeleteStore(data.data.storeName);
            return this.ok<string>(res, null, `File search store ${data.data.storeName} deleted successfully.`);
        } catch (error) {
            console.error("Error in deleteFileSearchStore endpoint:", error);
            return this.internalError<string>(res, `An error occurred while deleting the file search store ${data.data.storeName}.`);
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

        const data: ApiRequest<DeleteFileModel> = req.body;

        if (!data.data.fileName || !data.data.fileSearchStoreName) {
            return this.badRequest<string>(res, "fileName and fileSearchStoreName are required.");
        }

        try {
            await this.fileStoreService.DeleteFile(data.data.fileName, data.data.fileSearchStoreName);
            return this.ok<string>(res, null, "File deleted successfully.");
        } catch (error) {
            console.error("Error in deleteFile endpoint:", error);
            return this.internalError<string>(res, `An error occurred while deleting the file ${data.data.fileName}.`);
        }
    }
}
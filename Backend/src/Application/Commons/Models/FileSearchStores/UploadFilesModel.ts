import { MulterFile } from "../MulterFiles/MulterFile";

export interface UploadFilesModel {
    storeName: string;
    files: MulterFile[];
}
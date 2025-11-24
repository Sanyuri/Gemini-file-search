import { MulterFile } from "../MulterFiles/MulterFile";

export class UploadFilesModel {
    storeName: string;
    files: MulterFile[];

    constructor(storeName: string, files: MulterFile[]) {
        this.storeName = storeName;
        this.files = files;
    }
}
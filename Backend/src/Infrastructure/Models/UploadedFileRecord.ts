export class UploadedFileRecord {
    storeName: string;
    fileNames: string[];
    operationName: string;

    constructor(storeName: string, fileNames: string[], operationName: string) {
        this.storeName = storeName;
        this.fileNames = fileNames;
        this.operationName = operationName;
    }
}
export class DeleteFileModel {
    fileName: string;
    fileSearchStoreName: string;

    constructor(fileName: string, fileSearchStoreName: string) {
        this.fileName = fileName;
        this.fileSearchStoreName = fileSearchStoreName;
    }
}
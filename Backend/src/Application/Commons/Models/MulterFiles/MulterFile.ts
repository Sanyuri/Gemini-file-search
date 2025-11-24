export class MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string
    filename: string;
    path: string;
    size: number;

    constructor(fieldname: string, originalname: string, encoding: string, mimetype: string,
        destination: string, filename: string, path: string, size: number) {
        this.fieldname = fieldname;
        this.originalname = originalname;
        this.encoding = encoding;
        this.mimetype = mimetype;
        this.destination = destination;
        this.filename = filename;
        this.path = path;
        this.size = size;
    }
}
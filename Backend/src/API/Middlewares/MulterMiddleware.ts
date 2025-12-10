import multer, { Multer, FileFilterCallback } from 'multer';
import { Request } from 'express';
import { FileTypes } from '../../Domain/Enums/FileType';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const uploadDir = path.join(process.cwd(), 'uploads');

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }

        cb(null, uploadDir);
    },
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimes = [
        FileTypes.PDF.toString(),
        FileTypes.TXT.toString(),
        FileTypes.MD.toString(),
        FileTypes.OTHER.toString(),
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported. Only PDF, TXT, JPEG, and PNG files are allowed.'));
    }
};


const upload: Multer = multer({
    storage: storage,
    limits: { 
        fileSize: 1024 * 1024 * 20 
    },
    fileFilter: fileFilter 
});

export const fileUploadMiddleware = upload.array('files', 10);
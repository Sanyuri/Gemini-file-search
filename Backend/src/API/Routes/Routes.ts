import multer from 'multer';
import { Router } from 'express';
import { IAskQuestionService } from '../../Application/Commons/IServices/IAskQuestionService';
import { QAController } from '../Controllers/QAController';
import { IFileStoreService } from '../../Application/Commons/IServices/IFileStoreService';
import { FileController } from '../Controllers/FileController';
import { fileUploadMiddleware } from '../Middlewares/MulterMiddleware';

type ControllerFunction = (req: any, res: any) => Promise<any>;
const upload = multer({ dest: 'uploads/' });

export const createQaRouter = (askQuestionService: IAskQuestionService): Router => {
    const router = Router();

    const qaController = new QAController(askQuestionService);

    router.post(
        '/ask',
        qaController.ask.bind(qaController) as ControllerFunction
    );

    return router;
};

export const createFileStoreRouter = (fileStoreService: IFileStoreService): Router => {
    const router = Router();

    const fileController = new FileController(fileStoreService);

    router.post(
        '/create-store',
        fileController.createFileSearchStore.bind(fileController) as ControllerFunction
    );

    router.delete(
        '/delete-store',
        fileController.deleteFileSearchStore.bind(fileController) as ControllerFunction
    );

    router.post(
        '/upload-files',
        fileUploadMiddleware,
        fileController.uploadFilesToStore.bind(fileController) as ControllerFunction
    );

    router.delete(
        '/delete-file',
        fileController.deleteFile.bind(fileController) as ControllerFunction
    );

    router.get(
        '/store-info',
        fileController.getFileSearchStoreInfo.bind(fileController) as ControllerFunction
    );

    router.get(
        '/list-stores',
        fileController.listFileSearchStores.bind(fileController) as ControllerFunction
    );

    router.get(
        '/list-files',
        fileController.listFilesInStore.bind(fileController) as ControllerFunction
    );

    router.get(
        '/file-info',
        fileController.getFileInfo.bind(fileController) as ControllerFunction
    );

    return router;
};
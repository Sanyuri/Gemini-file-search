import multer from 'multer';
import { Router } from 'express';
import { IAskQuestionService } from '../../Application/Commons/IServices/IAskQuestionService';
import { QAController } from '../Controllers/QAController';
import { IFileStoreService } from '../../Application/Commons/IServices/IFileStoreService';
import { FileController } from '../Controllers/FileController';
import { fileUploadMiddleware } from '../Middlewares/MulterMiddleware';
import { authenticateJWT } from '../Middlewares/JwtMiddleware';
import { IUserService } from '../../Application/Commons/IServices/IUserService';
import { UserController } from '../Controllers/UserController';

type ControllerFunction = (req: any, res: any) => Promise<any>;

// User Router
export const createUserRouter = (userService: IUserService): Router => {
    const router = Router();

    const userController = new UserController(userService);

    router.post(
        '/login',
        userController.login.bind(userController) as ControllerFunction
    );

    router.post(
        '/register',
        userController.register.bind(userController) as ControllerFunction
    );

    router.post(
        '/logout',
        authenticateJWT,
        userController.logout.bind(userController) as ControllerFunction
    );

    router.get(
        '/profile',
        authenticateJWT,
        userController.getProfile.bind(userController) as ControllerFunction
    );

    router.get(
        '/file-stores',
        authenticateJWT,
        userController.getUserFileSearchStores.bind(userController) as ControllerFunction
    );
    return router;
}

// QA Router
export const createQaRouter = (askQuestionService: IAskQuestionService): Router => {
    const router = Router();

    const qaController = new QAController(askQuestionService);

    router.post(
        '/ask',
        qaController.ask.bind(qaController) as ControllerFunction
    );
    return router;
};

// File Store Router
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
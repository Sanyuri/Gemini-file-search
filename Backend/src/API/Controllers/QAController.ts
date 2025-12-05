import { Request, Response } from 'express';
import { IAskQuestionService } from '../../Application/Commons/IServices/IAskQuestionService';
import { AskModel } from '../../Application/Commons/Models/QAModels/AskModel';
import { BaseController } from './BaseController';
import { ApiRequest } from '../../Application/Commons/Models/Apis/ApiRequest';
import { ChatHistoryMapper } from '../../Application/Commons/Mappers/ChatHistoryMapper';

export class QAController extends BaseController {
    constructor(private askQuestionService: IAskQuestionService) { super(); }

    /**
     * Ask a question related to a file search store
     * @param req - The request object containing the question text and store name.
     * @param res - The response object to send the answer.
     * @returns An answer to the question or an error.
     */
    async ask(req: Request, res: Response){

        const data: ApiRequest<AskModel> = req.body;

        if (!data.data.questionText || !data.data.fileSearchStoreName) {
            return this.badRequest<ReturnType<typeof ChatHistoryMapper.toDTO>>(res, "questionText and fileSearchStoreName are required.");
        }

        try {
            const answer = await this.askQuestionService.AskQuestion(data.data);

            return this.ok<ReturnType<typeof ChatHistoryMapper.toDTO>>(res, answer, "Question answered successfully.");
        } catch (error) {
            console.error("Error in ask endpoint:", error);
            return this.internalError<Error>(res, "An error occurred while processing your request.", error as Error);
        }
    }
}
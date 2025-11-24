import { Request, Response } from 'express';
import { IAskQuestionService } from '../../Application/Commons/IServices/IAskQuestionService';
import { AskModel } from '../../Application/Commons/Models/QAModels/AskModel';
import { AnswerModel } from '../../Application/Commons/Models/QAModels/AnswerModel';
import { BaseController } from './BaseController';
import { ApiRequest } from '../../Application/Commons/Models/Apis/ApiRequest';

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
            return this.badRequest<AnswerModel>(res, "questionText and fileSearchStoreName are required.");
        }

        try {
            const answer = await this.askQuestionService.AskQuestion(data.data.questionText, data.data.fileSearchStoreName);

            return this.ok<AnswerModel>(res, answer);
        } catch (error) {
            console.error("Error in ask endpoint:", error);
            return this.internalError<AnswerModel>(res, "An error occurred while processing your request.", new AnswerModel("", []));
        }
    }
}
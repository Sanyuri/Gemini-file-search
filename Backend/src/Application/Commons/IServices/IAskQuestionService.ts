import { Answer } from "../../../Domain/Entities/Answer";

export interface IAskQuestionService {
    AskQuestion(questionText: string, fileSearchStoreName: string): Promise<Answer>;
}
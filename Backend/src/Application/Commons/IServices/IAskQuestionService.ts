import { ChatHistoryMapper } from "../Mappers/ChatHistoryMapper";
import { AskModel } from "../Models/QAModels/AskModel";

export interface IAskQuestionService {
    AskQuestion(askModel: AskModel): Promise<ReturnType<typeof ChatHistoryMapper.toDTO>>;
}
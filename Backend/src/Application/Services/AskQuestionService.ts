import { IGeminiRepository } from "../../Infrastructure/ExternalServices/IGeminiService";
import { ChatHistoryRepository } from "../../Infrastructure/Repositories/ChatHistoryRepository";
import { IAskQuestionService } from "../Commons/IServices/IAskQuestionService";
import { AskModel } from "../Commons/Models/QAModels/AskModel";
import { SessionChatRepository } from "../../Infrastructure/Repositories/SessionChatReoisitory";
import { UserRepository } from "../../Infrastructure/Repositories/UserRepository";
import { SessionChat } from "../../Domain/Entities/SessionChat";
import { User } from "../../Domain/Entities/User";
import { ChatHistory } from "../../Domain/Entities/ChatHistory";
import { ChatHistoryMapper } from "../Commons/Mappers/ChatHistoryMapper";

export class AskQuestionService implements IAskQuestionService {
    constructor(
        private readonly UserRepository: UserRepository,
        private readonly GeminiRepository: IGeminiRepository,
        private readonly ChatHistoryRepository: ChatHistoryRepository,
        private readonly SessionChatRepository: SessionChatRepository
    ) { }

    async AskQuestion(askModel: AskModel): Promise<ReturnType<typeof ChatHistoryMapper.toDTO>> {
        const geminiResponse = await this.GeminiRepository.queryFileSearch(askModel.questionText, askModel.fileSearchStoreName);
        // Save question and answer if userId is provided
        if (askModel.userId) {
            //Create Session Chat if sessionChatId is not provided
            const answer = await this.saveQuestionAndAnswer(askModel.questionText, geminiResponse.text, askModel.userId, askModel.sessionChatId, geminiResponse.sourceUrls);
            return ChatHistoryMapper.toDTO(answer);
        }
        return {
            id: "",
            chatHistory: geminiResponse.text,
            sessionChat: undefined,
            sourceUrls: geminiResponse.sourceUrls,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            createdBy: "chatbot",
            updatedBy: undefined,
            deletedAt: undefined,
            deletedBy: undefined,
        };
    }

    private async saveQuestionAndAnswer(questionText: string, answerText: string, userId: string, sessionChatId?: string, sourceUrls?: string[]): Promise<ChatHistory> {
        let sessionChat;
        const user = await this.UserRepository.findById(userId);
        // Validate user existence
        if (!user) {
            throw new Error("User not found");
        }
        // Create new session chat if sessionChatId is not provided
        if (!sessionChatId) {
            sessionChat = await this.createSessionChat(questionText, user as User);
        } else {
            sessionChat = await this.SessionChatRepository.findById(sessionChatId);
            if (!sessionChat) {
                throw new Error("Session chat not found");
            }
        }
        // Save question
        await this.ChatHistoryRepository.save({
            chatHistory: questionText,
            createdBy: "user",
            sessionChat: sessionChat
        } as ChatHistory);

        //Save answer
        return await this.ChatHistoryRepository.save({
            chatHistory: answerText,
            createdBy: "chatbot",
            sessionChat: sessionChat,
            sources: sourceUrls
        } as ChatHistory);
    }

    private async createSessionChat(questionText: string, user: User): Promise<SessionChat> {
        const sessionChat = await this.SessionChatRepository.save({
            sessionName: questionText.substring(0, 20),
            createdBy: user.username,
            user: user,
        } as SessionChat);
        return sessionChat;
    }
}
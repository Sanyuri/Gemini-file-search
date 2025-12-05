import { ChatHistory } from "../../../Domain/Entities/ChatHistory";

export class ChatHistoryMapper {
    static toDTO(chatHistory: ChatHistory) {
        return {
            id: chatHistory.id,
            chatHistory: chatHistory.chatHistory,
            sessionChat: chatHistory.sessionChat?.sessionName,
            sourceUrls: chatHistory.sources,
            createdAt: chatHistory.createdAt,
            updatedAt: chatHistory.updatedAt,
            isDeleted: chatHistory.isDeleted,
            createdBy: chatHistory.createdBy,
            updatedBy: chatHistory.updatedBy,
            deletedAt: chatHistory.deletedAt,
            deletedBy: chatHistory.deletedBy,
        };
    }
}
import { ChatHistory } from "../../Domain/Entities/ChatHistory";
import { SessionChatDb, SessionChatMapper } from "./SessionChatMapper";

export interface ChatHistoryDb {
    id: string;
    chatHistory: string;
    sourceUrls?: string | null;
    sessionChatId: string;
    sessionChat: SessionChatDb;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    deletedBy: string | null;
}

export class ChatHistoryMapper {
    static toDomain(dbModel: ChatHistoryDb): ChatHistory {
        return {
            ...new ChatHistory(dbModel.chatHistory, dbModel.createdBy, SessionChatMapper.toDomain(dbModel.sessionChat)),
            id: dbModel.id,
            sources: dbModel.sourceUrls?.split(',') || undefined,
            createdAt: dbModel.createdAt,
            updatedAt: dbModel.updatedAt || undefined,
            isDeleted: dbModel.isDeleted,
            deletedAt: dbModel.deletedAt || undefined,
            deletedBy: dbModel.deletedBy || undefined,
            updatedBy: dbModel.updatedBy || undefined,
        };
    }
    static toDb(domainModel: ChatHistory): ChatHistoryDb {
        return {
            id: domainModel.id,
            chatHistory: domainModel.chatHistory,
            sourceUrls: domainModel.sources ? domainModel.sources.join(',') : undefined,
            sessionChatId: domainModel.sessionChat.id,
            sessionChat: SessionChatMapper.toDb(domainModel.sessionChat),
            createdAt: domainModel.createdAt,
            createdBy: domainModel.createdBy,
            updatedAt: domainModel.updatedAt || null,
            updatedBy: domainModel.updatedBy || null,
            isDeleted: domainModel.isDeleted,
            deletedAt: domainModel.deletedAt || null,
            deletedBy: domainModel.deletedBy || null,
        };
    }
}
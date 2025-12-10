import { SessionChat } from "../../../Domain/Entities/SessionChat";

export class SessionChatMapper {
    static toDTO(sessionChat: SessionChat) {
        return {
            id: sessionChat.id,
            sessionName: sessionChat.sessionName,
            createdAt: sessionChat.createdAt,
            updatedAt: sessionChat.updatedAt,
            isDeleted: sessionChat.isDeleted,
            createdBy: sessionChat.createdBy,
            updatedBy: sessionChat.updatedBy,
            deletedAt: sessionChat.deletedAt,
            deletedBy: sessionChat.deletedBy,
        };
    }
}
import { SessionChat } from "../../Domain/Entities/SessionChat";
import { UserDb, UserDbMapper } from "./UserDbMapper";

export interface SessionChatDb {
    id: string;
    sessionName: string;
    userId: string;
    user: UserDb;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    deletedBy: string | null;
}

export class SessionChatMapper {
    static toDomain(sessionChatDb: SessionChatDb): SessionChat {
        return {
            ...new SessionChat(sessionChatDb.sessionName, sessionChatDb.createdBy, UserDbMapper.toDomain(sessionChatDb.user)),
            id: sessionChatDb.id,
            createdAt: sessionChatDb.createdAt,
            updatedAt: sessionChatDb.updatedAt ? sessionChatDb.updatedAt : undefined,
            updatedBy: sessionChatDb.updatedBy ? sessionChatDb.updatedBy : undefined,
            isDeleted: sessionChatDb.isDeleted,
            deletedAt: sessionChatDb.deletedAt ? sessionChatDb.deletedAt : undefined,
            deletedBy: sessionChatDb.deletedBy ? sessionChatDb.deletedBy : undefined,
        }
    }

    static toDb(sessionChat: SessionChat): SessionChatDb {
        return {
            id: sessionChat.id,
            sessionName: sessionChat.sessionName,
            userId: sessionChat.user.id,
            user: UserDbMapper.toDb(sessionChat.user),
            createdAt: sessionChat.createdAt,
            createdBy: sessionChat.createdBy,
            updatedAt: sessionChat.updatedAt ? sessionChat.updatedAt : null,
            updatedBy: sessionChat.updatedBy ? sessionChat.updatedBy : null,
            isDeleted: sessionChat.isDeleted,
            deletedAt: sessionChat.deletedAt ? sessionChat.deletedAt : null,
            deletedBy: sessionChat.deletedBy ? sessionChat.deletedBy : null,
        }
    }
}
import { SessionChat } from "../../Domain/Entities/SessionChat";
import prisma from "../Database/Prisma";
import { SessionChatDb, SessionChatMapper } from "../Mappers/SessionChatMapper";

export class SessionChatRepository {
    /**
     * Retrieves session chat by its ID.
     * @param id
     * @returns
     */
    async findById(id: string): Promise<SessionChat | null> {
        const result = await prisma.sessionChat.findUnique({ where: { id }, include: { user: true } });
        return result ? SessionChatMapper.toDomain(result) : null;
    }

    /**
     * Retrieves all session chats by user ID.
     * @param userId
     * @returns
     */
    async findByUserId(userId: string): Promise<SessionChat[]> {
        const results = await prisma.sessionChat.findMany({ where: { userId, isDeleted: false }, include: { user: true } });
        return results.map((result: SessionChatDb) => (SessionChatMapper.toDomain(result)));
    }

    /**
     * Saves a new session chat to the database.
     * @param sessionChat
     * @returns
     */
    async save(sessionChat: SessionChat): Promise<SessionChat> {
        const mappedData = SessionChatMapper.toDb(sessionChat);
        const { user, ...createdData } = mappedData;
        const result = await prisma.sessionChat.create({ data: createdData });
        return SessionChatMapper.toDomain({ ...result, user: mappedData.user });
    }

    /**
     * Updates an existing session chat.
     * @param sessionChat
     * @returns
     */
    async update(sessionChat: SessionChat): Promise<SessionChat> {
        const mappedData = SessionChatMapper.toDb(sessionChat);
        const { user, ...updatedData } = mappedData;
        const result = await prisma.sessionChat.update({
            where: { id: sessionChat.id },
            data: updatedData,
            include: { user: true },
        });
        return SessionChatMapper.toDomain({ ...result, user: mappedData.user });
    }

    /**
     * Deletes a session chat by its ID.
     * @param id
     * @returns
     */
    async delete(id: string): Promise<void> {
        await prisma.sessionChat.delete({ where: { id } });
    }
}
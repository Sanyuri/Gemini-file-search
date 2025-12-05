import { SessionChat } from "../../Domain/Entities/SessionChat";
import prisma from "../Database/Prisma";

export class SessionChatRepository {
    /**
     * Retrieves session chat by its ID.
     * @param id
     * @returns
     */
    async findById(id: string): Promise<SessionChat | null> {
        const result = await prisma.sessionChat.findUnique({ where: { id }, include: { user: true } });
        return !result ? null : ({
            id: result.id,
            sessionName: result.sessionName,
            createdAt: result.createdAt,
            createdBy: result.createdBy,
            isDeleted: result.isDeleted,
            updatedAt: result.updatedAt || undefined,
            updatedBy: result.updatedBy || undefined,
            deletedAt: result.deletedAt || undefined,
            deletedBy: result.deletedBy || undefined,
            user: result.user ? {
                id: result.user.id,
                username: result.user.username,
                email: result.user.email
            } : undefined,
        } as SessionChat);
    }

    /**
     * Retrieves all session chats by user ID.
     * @param userId
     * @returns
     */
    async findByUserId(userId: string): Promise<SessionChat[]> {
        const results = await prisma.sessionChat.findMany({ where: { userId, isDeleted: false }, include: { user: true } });
        return results.map(result => ({
            id: result.id,
            sessionName: result.sessionName,
            createdAt: result.createdAt,
            createdBy: result.createdBy,
            isDeleted: result.isDeleted,
            updatedAt: result.updatedAt || undefined,
            updatedBy: result.updatedBy || undefined,
            deletedAt: result.deletedAt || undefined,
            deletedBy: result.deletedBy || undefined,
            user: {
                id: result.user.id,
                username: result.user.username,
                email: result.user.email
            }
        } as SessionChat));
    }

    /**
     * Saves a new session chat to the database.
     * @param sessionChat
     * @returns
     */
    async save(sessionChat: SessionChat): Promise<SessionChat> {
        const data = {
            sessionName: sessionChat.sessionName,
            createdAt: new Date(),
            createdBy: sessionChat.createdBy,
            isDeleted: false,
            user: sessionChat.user ? { connect: { id: sessionChat.user.id } } : undefined,
        };
        const result = await prisma.sessionChat.create({ data, include: { user: true } });
        return {
            id: result.id,
            sessionName: result.sessionName,
            createdAt: result.createdAt,
            createdBy: result.createdBy,
            isDeleted: result.isDeleted,
            updatedAt: result.updatedAt || undefined,
            updatedBy: result.updatedBy || undefined,
            deletedAt: result.deletedAt || undefined,
            deletedBy: result.deletedBy || undefined,
            user: result.user ? {
                id: result.user.id,
                username: result.user.username,
                email: result.user.email
            } : undefined,
        } as SessionChat;
    }

    /**
     * Updates an existing session chat.
     * @param sessionChat
     * @returns
     */
    async update(sessionChat: SessionChat): Promise<SessionChat> {
        const data = {
            sessionName: sessionChat.sessionName,
            updatedAt: new Date(),
            updatedBy: sessionChat.updatedBy,
        };
        const result = await prisma.sessionChat.update({
            where: { id: sessionChat.id },
            data,
            include: { user: true },
        });
        return {
            id: result.id,
            sessionName: result.sessionName,
            createdAt: result.createdAt,
            createdBy: result.createdBy,
            isDeleted: result.isDeleted,
            updatedAt: result.updatedAt || undefined,
            updatedBy: result.updatedBy || undefined,
            deletedAt: result.deletedAt || undefined,
            deletedBy: result.deletedBy || undefined,
            user: result.user ? {
                id: result.user.id,
                username: result.user.username,
                email: result.user.email
            } : undefined,
        } as SessionChat;
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
import prisma from "../Database/Prisma";
import { ChatHistory } from "../../Domain/Entities/ChatHistory";

export class ChatHistoryRepository {
    /**
     * Adds a new chat history to the database.
     * @param chatHistory 
     * @returns 
     */
    async save(chatHistory: ChatHistory): Promise<ChatHistory> {
        const data = {
            chatHistory: chatHistory.chatHistory,
            createdAt: new Date(),
            createdBy: chatHistory.createdBy,
            updatedAt: undefined,
            isDeleted: false,
            sessionChat: {
                connect: { id: chatHistory.sessionChat?.id }
            },
            sourceUrls: chatHistory.sources?.join(","),
        };

        const result = await prisma.chatHistory.create({ data });
        return {
            id: result.id,
            chatHistory: result.chatHistory,
            sessionChat: chatHistory.sessionChat,
            sources: result.sourceUrls ? result.sourceUrls.split(",") : [],
            createdAt: result.createdAt,
            updatedAt: result.updatedAt || undefined,
            isDeleted: result.isDeleted,
            createdBy: result.createdBy,
            updatedBy: result.updatedBy || undefined,
            deletedAt: result.deletedAt || undefined,
            deletedBy: result.deletedBy || undefined,
        };
    }

    /**
     * Finds a question by chatSession.
     * @param sessionChatId
     * @returns
     */
    async findBySessionChat(sessionChatId: string): Promise<ChatHistory[]> {
        const results = await prisma.chatHistory.findMany({
            where: {
                sessionChatId: sessionChatId,
                isDeleted: false,
            },
            orderBy: { createdAt: 'asc' },
            include: { sessionChat: true },
        });
        return results.map(result => ({
            id: result.id,
            chatHistory: result.chatHistory,
            sessionChat: result.sessionChat,
            sources: result.sourceUrls ? result.sourceUrls.split(",") : [],
            createdAt: result.createdAt,
            updatedAt: result.updatedAt || undefined,
            isDeleted: result.isDeleted,
            createdBy: result.createdBy,
            updatedBy: result.updatedBy || undefined,
            deletedAt: result.deletedAt || undefined,
            deletedBy: result.deletedBy || undefined,
        })) as ChatHistory[];
    }

    /**
     * Updates an existing question.
     * @param question
     * @returns
     */
    async update(chatHistory: ChatHistory): Promise<ChatHistory> {
        const data = {
            chatHistory: chatHistory.chatHistory,
            updatedAt: new Date(),
            updatedBy: chatHistory.updatedBy,
        };
        const result = await prisma.chatHistory.update({
            where: { id: chatHistory.id },
            data,
        });
        return result as ChatHistory;
    }

    /**
     * Deletes a question by its ID.
     * @param id
     * @returns
     */
    async delete(id: string): Promise<void> {
        await prisma.chatHistory.delete({ where: { id } });
    }
}
import prisma from "../Database/Prisma";
import { ChatHistory } from "../../Domain/Entities/ChatHistory";

export class ChatHistoryRepository {
    /**
     * Adds a new question to the database.
     * @param question 
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
            sources: chatHistory.sources,
        };

        const result = await prisma.chatHistory.create({ data });
        return result as ChatHistory;
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
        });
        return results as ChatHistory[];
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
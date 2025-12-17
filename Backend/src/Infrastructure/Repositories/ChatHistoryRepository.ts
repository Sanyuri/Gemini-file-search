import prisma from "../Database/Prisma";
import { ChatHistory } from "../../Domain/Entities/ChatHistory";
import { ChatHistoryMapper } from "../Mappers/ChatHistoryMapper";
import { Prisma } from "@prisma/client";

export class ChatHistoryRepository {
    /**
     * Adds a new chat history to the database.
     * @param chatHistory 
     * @returns 
     */
    async save(chatHistory: ChatHistory): Promise<ChatHistory> {

        const mappedData = ChatHistoryMapper.toDb(chatHistory);
        const { sessionChat, ...createData } = mappedData;
        const result = await prisma.chatHistory.create({ data: createData });
        return ChatHistoryMapper.toDomain({ ...result, sessionChat: mappedData.sessionChat });
    }

    /**
     * Finds a question by chatSession.
     * @param sessionChatId
     * @returns
     */
    async findBySessionChat(sessionChatId: string): Promise<ChatHistory[]> {
        type ChatHistoryWithSessionChat = Prisma.ChatHistoryGetPayload<{
            include: { sessionChat: { include: { user: true } } };
        }>;

        const results: ChatHistoryWithSessionChat[] = await prisma.chatHistory.findMany({
            where: {
                sessionChatId: sessionChatId,
                isDeleted: false,
            },
            orderBy: { createdAt: 'asc' },
            include: { sessionChat: { include: { user: true } } },
        });
        return results.map((result: ChatHistoryWithSessionChat) => {
            return ChatHistoryMapper.toDomain({ ...result, sessionChat: result.sessionChat });
        });
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
        return ChatHistoryMapper.toDomain({ ...result, sessionChat: ChatHistoryMapper.toDb(chatHistory).sessionChat });
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
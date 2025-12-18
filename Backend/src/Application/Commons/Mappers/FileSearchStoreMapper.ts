import { create } from "domain";
import { FileSearchStore } from "../../../Domain/Entities/FileSearchStore";
import { FileSearchStore as FileSearchStoreGemini } from "@google/genai";

export class FileSearchStoreMapper {
    static toDTO(fileSearchStore: FileSearchStore) {
        return {
            id: fileSearchStore.id,
            name: fileSearchStore.storeName,
            sizeBytes: fileSearchStore.sizeBytes,
            createdAt: fileSearchStore.createdAt,
            updatedAt: fileSearchStore.updatedAt,
            isDeleted: fileSearchStore.isDeleted,
            createdBy: fileSearchStore.createdBy,
            updatedBy: fileSearchStore.updatedBy,
            deletedAt: fileSearchStore.deletedAt,
            deletedBy: fileSearchStore.deletedBy,
        };
    }

    static toDTOfromGemini(geminiStore: FileSearchStoreGemini) {
        return {
            id: geminiStore.name,
            displayName: geminiStore.displayName,
            createTime: geminiStore.createTime,
            updateTime: geminiStore.updateTime,
        };
    }
}
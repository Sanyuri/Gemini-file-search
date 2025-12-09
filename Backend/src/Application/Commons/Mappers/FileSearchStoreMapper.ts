import { FileSearchStore } from "../../../Domain/Entities/FileSearchStore";

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
}
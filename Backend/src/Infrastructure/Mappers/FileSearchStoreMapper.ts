import { FileSearchStore } from "../../Domain/Entities/FileSearchStore";
import { UserDb, UserDbMapper } from "./UserDbMapper";

export interface FileSearchStoreDb {
    id: string;
    storeName: string;
    sizeBytes: string | null;
    userId: string;
    user: UserDb,
    createdAt: Date;
    createdBy: string;
    isDeleted: boolean;
    updatedAt: Date | null;
    updatedBy: string | null;
    deletedAt: Date | null;
    deletedBy: string | null;
}

export class FileSearchStoreMapper {
    static toDomain(dbModel: FileSearchStoreDb): FileSearchStore {
        return {
            ... new FileSearchStore(dbModel.storeName, dbModel.createdBy, UserDbMapper.toDomain(dbModel.user), dbModel.createdBy),
            id: dbModel.id,
            sizeBytes: dbModel.sizeBytes || undefined,
            createdAt: dbModel.createdAt,
            updatedAt: dbModel.updatedAt || undefined,
            isDeleted: dbModel.isDeleted,
            deletedAt: dbModel.deletedAt || undefined,
            deletedBy: dbModel.deletedBy || undefined,
            updatedBy: dbModel.updatedBy || undefined,
        };
    }

    static toDb(domainModel: FileSearchStore): FileSearchStoreDb {
        return {
            id: domainModel.id,
            storeName: domainModel.storeName,
            sizeBytes: domainModel.sizeBytes || null,
            userId: domainModel.user.id,
            user: UserDbMapper.toDb(domainModel.user),
            createdAt: domainModel.createdAt,
            createdBy: domainModel.createdBy,
            isDeleted: domainModel.isDeleted,
            updatedAt: domainModel.updatedAt || null,
            updatedBy: domainModel.updatedBy || null,
            deletedAt: domainModel.deletedAt || null,
            deletedBy: domainModel.deletedBy || null,
        };
    }
}

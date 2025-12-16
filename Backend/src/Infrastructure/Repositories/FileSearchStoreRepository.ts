import { FileSearchStore } from '../../Domain/Entities/FileSearchStore';
import { User } from '../../Domain/Entities/User';
import prisma from "../Database/Prisma";
import { FileSearchStore as FileSearchStoreDb } from "../../../prisma/generated/prisma";
import { FileSearchStoreMapper } from '../Mappers/FileSearchStoreMapper';
export class FileSearchStoreRepository {
    /**
     * Adds a new file search store to the database.
     * @param fileSearchStore 
     * @returns
     */
    async save(fileSearchStore: FileSearchStore): Promise<FileSearchStore> {
        const mappedData = FileSearchStoreMapper.toDb(fileSearchStore);
        const { user, ...createData } = mappedData;
        const createdFileSearchStore = await prisma.fileSearchStore.create({ data: createData });
        return FileSearchStoreMapper.toDomain({ ...createdFileSearchStore, user: mappedData.user });
    }

    /**
     * Get file search stores by user ID.
     * @param userId 
     * @returns
     */
    async findByUserId(userId: string): Promise<FileSearchStore[]> {
        const stores: FileSearchStoreDb[] = await prisma.fileSearchStore.findMany({
            where: {
                userId: userId,
                isDeleted: false
            }
        });
        return stores.map((store: FileSearchStoreDb) => {
            return {
                ...store,
                user: { id: userId } as User
            } as FileSearchStore;
        });
    }
}
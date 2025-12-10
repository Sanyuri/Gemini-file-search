import { FileSearchStore } from '../../Domain/Entities/FileSearchStore';
import { User } from '../../Domain/Entities/User';
import prisma from '../Database/Prisma';
export class FileSearchStoreRepository {
    /**
     * Adds a new file search store to the database.
     * @param fileSearchStore 
     * @returns
     */
    async save(fileSearchStore: FileSearchStore): Promise<FileSearchStore> {
        const data = {
            id: fileSearchStore.id,
            storeName: fileSearchStore.storeName,
            sizeBytes: fileSearchStore.sizeBytes || undefined,
            user: { connect: { id: fileSearchStore.user.id } },
            createdAt: new Date(),
            createdBy: fileSearchStore.createdBy,
            updatedAt: undefined,
            isDeleted: false
        };
        const createdFileSearchStore = await prisma.fileSearchStore.create({ data });
        return new FileSearchStore(
            createdFileSearchStore.id,
            createdFileSearchStore.storeName,
            fileSearchStore.user,
            createdFileSearchStore.createdBy,
            createdFileSearchStore.sizeBytes || undefined
        );
    }

    /**
     * Get file search stores by user ID.
     * @param userId 
     * @returns
     */
    async findByUserId(userId: string): Promise<FileSearchStore[]> {
        const stores = await prisma.fileSearchStore.findMany({
            where: {
                userId: userId,
                isDeleted: false
            }
        });
        return stores.map((store): FileSearchStore => {
            return {
                ...store,
                user: { id: userId } as User
            } as FileSearchStore;
        });
    }
}
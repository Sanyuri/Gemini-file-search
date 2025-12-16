export interface FileSearchStoreResponse {
    id: string;
    displayName?: string;
    createTime?: string;
    updateTime?: string;
}

export interface FileSearchStore {
    id: string;
    name: string;
    sizeBytes?: string;
    createdAt: string;
    updatedAt?: string;
    isDeleted: boolean;
    createdBy: string;
    updatedBy?: string;
    deletedAt?: string;
    deletedBy?: string;
}
export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt?: Date;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}
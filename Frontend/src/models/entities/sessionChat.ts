export interface SessionChat {
    id: string;
    sessionName: string;
    createdAt: string;
    updatedAt?: string;
    isDeleted: boolean;
    createdBy: string;
    updatedBy?: string;
    deletedAt?: string;
    deletedBy?: string;
}
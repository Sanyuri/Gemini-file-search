export interface Answer {
    id: string;
    chatHistory: string;
    sessionChat?: string;
    sourceUrls: string[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    deletedAt?: Date;
    deletedBy?: string;
}
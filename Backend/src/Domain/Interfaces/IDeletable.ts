export interface IDeletable {
    isDeleted: boolean;
    deletedAt?: Date;
    deletedBy?: string;
}
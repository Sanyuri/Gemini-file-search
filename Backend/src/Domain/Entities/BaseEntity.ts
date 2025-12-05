import { IAuditable } from "../Interfaces/IAuditable";
import { IDeletable } from "../Interfaces/IDeletable";

export interface IEntity extends IAuditable, IDeletable {

}

export abstract class BaseEntity<TKey> implements IEntity {
    id: TKey;

    createdAt: Date;

    updatedAt?: Date;

    createdBy: string;

    updatedBy?: string | undefined;

    isDeleted: boolean;

    deletedAt?: Date | undefined;

    deletedBy?: string | undefined;

    constructor(id: TKey, createdAt: Date, createdBy: string, isDeleted: boolean) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.isDeleted = isDeleted;
    }
}

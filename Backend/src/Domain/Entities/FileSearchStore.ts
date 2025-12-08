import { BaseEntity } from './BaseEntity.js'
import { v4 as uuidv4 } from 'uuid'
import { User } from './User.js';

export class FileSearchStore extends BaseEntity<string> {
    storeName: string;
    sizeBytes?: string;
    user: User;

    constructor(id: string, storeName: string, user: User, createdBy: string, sizeBytes?: string) {
        super(id, new Date(), createdBy, false);
        this.storeName = storeName;
        this.sizeBytes = sizeBytes;
        this.user = user;
    }
}
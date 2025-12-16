import { User } from "../../Domain/Entities/User";

export interface UserDb {
    id: string;
    username: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    deletedBy: string | null;
}

export class UserDbMapper {
    static toDomain(userDb: UserDb): User {
        return {
            ...new User(userDb.username, userDb.email, userDb.password, userDb.createdBy),
            id: userDb.id,
            isActive: userDb.isActive,
            createdAt: userDb.createdAt,
            updatedAt: userDb.updatedAt ? userDb.updatedAt : undefined,
            updatedBy: userDb.updatedBy ? userDb.updatedBy : undefined,
            isDeleted: userDb.isDeleted,
            deletedAt: userDb.deletedAt ? userDb.deletedAt : undefined,
            deletedBy: userDb.deletedBy ? userDb.deletedBy : undefined,
        }
    }
    static toDb(user: User) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            isActive: user.isActive,
            createdAt: user.createdAt,
            createdBy: user.createdBy,
            updatedAt: user.updatedAt ? user.updatedAt : null,
            updatedBy: user.updatedBy ? user.updatedBy : null,
            isDeleted: user.isDeleted,
            deletedAt: user.deletedAt ? user.deletedAt : null,
            deletedBy: user.deletedBy ? user.deletedBy : null,
        }
    }
}
import { User } from "../../../Domain/Entities/User";

export class UserMapper {
    static toDTO(user: User) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isDeleted: user.isDeleted,
            createdBy: user.createdBy,
            updatedBy: user.updatedBy,
            deletedAt: user.deletedAt,
            deletedBy: user.deletedBy,
        };
    }
}
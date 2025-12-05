import { User } from "../Database/generated/prisma";
import prisma from "../Database/Prisma";

export class UserRepository {
    /**
     * Retrieves user by its ID.
     * @param id
     * @returns
     */
    async findById(id: string): Promise<User | null> {
        const result = await prisma.user.findUnique({ where: { id } });
        return result ? (result as User) : null;
    }

    /**
     * Retrieves user by its email.
     * @param email
     * @returns
     */
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findFirst({ where: { email } });
        return result ? (result as User) : null;
    }

    /**
     * Retrieves all users.
     * @returns
     */
    async findAll(): Promise<User[]> {
        const results = await prisma.user.findMany();
        return results as User[];
    }

    /**
     * Saves a new user to the database.
     * @param user
     * @returns
     */
    async save(user: User): Promise<User> {
        const data = {
            username: user.username,
            email: user.email,
            password: user.password,
            createdAt: new Date(),
            createdBy: user.createdBy,
            updatedAt: undefined,
            isDeleted: false,
        };
        const result = await prisma.user.create({ data });
        return result as User;
    }

    /**
     * Updates an existing user.
     * @param user
     * @returns
     */
    async update(user: User): Promise<User> {
        const data = {
            username: user.username,
            email: user.email,
            password: user.password,
            updatedAt: new Date(),
            updatedBy: user.updatedBy,
        };
        const result = await prisma.user.update({ where: { id: user.id }, data });
        return result as User;
    }

    /**
    * Soft deletes a user by its ID.
    * @param id
    * @returns
    */
    async delete(id: string): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: { isDeleted: true, updatedAt: new Date() },
        });
    }

    /**
     * Hard deletes a user by its ID.
     * @param id
     * @returns
     */
    async hardDelete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }

}
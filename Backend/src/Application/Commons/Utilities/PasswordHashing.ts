import bcrypt from 'bcrypt';

export class PasswordHashing {
    static async comparePassword(password: string, password1: string): Promise<boolean> {
        return await bcrypt.compare(password, password1);
    }
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}
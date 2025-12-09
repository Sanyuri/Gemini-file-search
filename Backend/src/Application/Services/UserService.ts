import { User } from "../../Domain/Entities/User";
import { FileSearchStoreRepository } from "../../Infrastructure/Repositories/FileSearchStoreRepository";
import { UserRepository } from "../../Infrastructure/Repositories/UserRepository";
import { IUserService } from "../Commons/IServices/IUserService";
import { FileSearchStoreMapper } from "../Commons/Mappers/FileSearchStoreMapper";
import { UserMapper } from "../Commons/Mappers/UserMapper";
import { LoginModel } from "../Commons/Models/Users/LoginModel";
import { RegisterModel } from "../Commons/Models/Users/RegisterModel";
import { Jwt } from "../Commons/Utilities/Jwt";
import { PasswordHashing } from "../Commons/Utilities/PasswordHashing";

export class UserService implements IUserService {
    constructor(private jwt: Jwt, private userRepository: UserRepository, private fileSearchStoreRepository: FileSearchStoreRepository) { }
    /**
     * Register a new user.
     * @param data 
     */
    async register(data: RegisterModel): Promise<ReturnType<typeof UserMapper.toDTO>> {
        const userToCreate = new User(data.email, data.email, await PasswordHashing.hashPassword(data.password), "system");

        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const createdUser = await this.userRepository.save(userToCreate);

        return UserMapper.toDTO(createdUser);
    }

    /**
     * Login a user.
     * @param loginModel
     * @returns access token
     */
    async login(loginModel: LoginModel): Promise<string> {
        const user = await this.userRepository.findByEmail(loginModel.email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await PasswordHashing.comparePassword(loginModel.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return this.jwt.generateToken({ id: user.id, email: user.email });
    }

    /**
     * Get user by ID.
     * @param userId
     * @returns
     */
    async getById(userId: string): Promise<ReturnType<typeof UserMapper.toDTO> | null> {
        const user = await this.userRepository.findById(userId);
        return user ? UserMapper.toDTO(user) : null;
    }

    /**
     * Get file search stores for a user.
     * @param userId
     * @returns
     */
    async getUserFileSearchStores(userId: any): Promise<ReturnType<typeof FileSearchStoreMapper.toDTO>[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const stores = await this.fileSearchStoreRepository.findByUserId(user.id);
        return stores.map(store => FileSearchStoreMapper.toDTO(store));
    }
}
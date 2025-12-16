import { SessionChat } from "../../Domain/Entities/SessionChat";
import { User } from "../../Domain/Entities/User";
import { ChatHistoryRepository } from "../../Infrastructure/Repositories/ChatHistoryRepository";
import { FileSearchStoreRepository } from "../../Infrastructure/Repositories/FileSearchStoreRepository";
import { SessionChatRepository } from "../../Infrastructure/Repositories/SessionChatRepository";
import { UserRepository } from "../../Infrastructure/Repositories/UserRepository";
import { IUserService } from "../Commons/IServices/IUserService";
import { ChatHistoryMapper } from "../Commons/Mappers/ChatHistoryMapper";
import { FileSearchStoreMapper } from "../Commons/Mappers/FileSearchStoreMapper";
import { SessionChatMapper } from "../Commons/Mappers/SessionChatMapper";
import { UserMapper } from "../Commons/Mappers/UserMapper";
import { LoginModel } from "../Commons/Models/Users/LoginModel";
import { RegisterModel } from "../Commons/Models/Users/RegisterModel";
import { Jwt } from "../Commons/Utilities/Jwt";
import { PasswordHashing } from "../Commons/Utilities/PasswordHashing";

export class UserService implements IUserService {
    constructor(private jwt: Jwt,
        private userRepository: UserRepository,
        private fileSearchStoreRepository: FileSearchStoreRepository,
        private sessionChatRepository: SessionChatRepository,
        private chatHistoryRepository: ChatHistoryRepository) { }
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
    async getUserFileSearchStores(userId: string): Promise<ReturnType<typeof FileSearchStoreMapper.toDTO>[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const stores = await this.fileSearchStoreRepository.findByUserId(user.id);
        return stores.map(store => FileSearchStoreMapper.toDTO(store));
    }

    /**
     * Get session chats for a user.
     * @param userId
     * @returns
     */
    async getUserSessionChats(userId: string): Promise<ReturnType<typeof SessionChatMapper.toDTO>[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const sessions = await this.sessionChatRepository.findByUserId(user.id);
        return sessions.map((session: SessionChat) => SessionChatMapper.toDTO(session));
    }

    /**
     * Get chat histories for a user in a session.
     * @param userId
     * @param sessionChatId
     * @returns
     */
    async getUserChatHistories(userId: string, sessionChatId: string): Promise<ReturnType<typeof ChatHistoryMapper.toDTO>[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const session = await this.sessionChatRepository.findById(sessionChatId);
        if (!session) {
            throw new Error("Session chat not found");
        }
        const chatHistories = await this.chatHistoryRepository.findBySessionChat(session.id);
        return chatHistories.map(chatHistory => ChatHistoryMapper.toDTO(chatHistory));
    }
}
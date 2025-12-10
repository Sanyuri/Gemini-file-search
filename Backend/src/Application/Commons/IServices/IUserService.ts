import { ChatHistoryMapper } from "../Mappers/ChatHistoryMapper";
import { FileSearchStoreMapper } from "../Mappers/FileSearchStoreMapper";
import { SessionChatMapper } from "../Mappers/SessionChatMapper";
import { UserMapper } from "../Mappers/UserMapper";
import { LoginModel } from "../Models/Users/LoginModel";
import { RegisterModel } from "../Models/Users/RegisterModel";

export interface IUserService {
    getUserChatHistories(userId: string, sessionChatId: string): Promise<ReturnType<typeof ChatHistoryMapper.toDTO>[]>;
    getUserSessionChats(userId: string): Promise<ReturnType<typeof SessionChatMapper.toDTO>[]>;
    getUserFileSearchStores(userId: string): Promise<ReturnType<typeof FileSearchStoreMapper.toDTO>[]>;
    getById(userId: string): Promise<ReturnType<typeof UserMapper.toDTO> | null>;
    login(data: LoginModel): Promise<string>;
    register(data: RegisterModel): Promise<ReturnType<typeof UserMapper.toDTO>>;

}
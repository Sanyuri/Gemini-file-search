import { FileSearchStoreMapper } from "../Mappers/FileSearchStoreMapper";
import { UserMapper } from "../Mappers/UserMapper";
import { LoginModel } from "../Models/Users/LoginModel";
import { RegisterModel } from "../Models/Users/RegisterModel";

export interface IUserService {
    getUserFileSearchStores(userId: any): Promise<ReturnType<typeof FileSearchStoreMapper.toDTO>[]>;
    getById(userId: string): Promise<ReturnType<typeof UserMapper.toDTO> | null>;
    login(data: LoginModel): Promise<string>;
    register(data: RegisterModel): Promise<ReturnType<typeof UserMapper.toDTO>>;

}
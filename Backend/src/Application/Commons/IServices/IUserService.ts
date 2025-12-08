import { UserMapper } from "../Mappers/UserMapper";
import { LoginModel } from "../Models/Users/LoginModel";
import { RegisterModel } from "../Models/Users/RegisterModel";

export interface IUserService {
    login(data: LoginModel): Promise<string>;
    register(data: RegisterModel): Promise<ReturnType<typeof UserMapper.toDTO>>;

}
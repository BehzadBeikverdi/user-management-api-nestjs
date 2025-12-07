import {User} from "../../modules/user/user.entity";
export interface IUserService {
    findByEmail(email: string): Promise<User>;
}

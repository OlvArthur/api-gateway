import { IUser } from "../../repositories/IFindOneUserRepositoty";

export default interface IAuthenticaUserService {
  execute(email: string): Promise<{ user: IUser, token: string }>
}

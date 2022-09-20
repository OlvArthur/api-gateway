import { IUser } from "@modules/users/repositories/IFindOneUserRepository";


export interface IAuthenticateUserService {
  execute(email: string): Promise<{ user: IUser, token: string }>
}

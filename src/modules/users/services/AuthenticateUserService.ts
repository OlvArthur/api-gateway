import { IFindOneUserRepository } from "../repositories/IFindOneUserRepositoty";
import IAuthenticaUserService from "./interfaces/IAuthenticateUserService";

class AuthenticateUserService implements IAuthenticaUserService {
  constructor(private usersRepository: IFindOneUserRepository) {}
  
  public async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new Error('Login Failed: invalid username or password')

    return { user, token: `found user`}
  }
}

export default AuthenticateUserService

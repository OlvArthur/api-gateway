import ITokenProvider from "../providers/AuthTokenProvider/models/ITokenProvider";
import { IFindOneUserRepository } from "../repositories/IFindOneUserRepositoty";
import IAuthenticaUserService from "./interfaces/IAuthenticateUserService";

class AuthenticateUserService implements IAuthenticaUserService {
  constructor(private usersRepository: IFindOneUserRepository, private authTokenProvider: ITokenProvider) {}
  
  public async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new Error('Login Failed: invalid username or password')

    const token = this.authTokenProvider.generateToken(JSON.stringify(user.id))

    return { user, token }
  }
}

export default AuthenticateUserService

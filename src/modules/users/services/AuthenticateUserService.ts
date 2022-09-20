import { ITokenProvider } from "@modules/users/providers/AuthTokenProvider/models/ITokenProvider"
import { IFindOneUserRepository } from "@modules/users/repositories/IFindOneUserRepository"
import { IAuthenticateUserService } from "@modules/users/services/interfaces/IAuthenticateUserService"



class AuthenticateUserService implements IAuthenticateUserService {
  constructor(private usersRepository: IFindOneUserRepository, private authTokenProvider: ITokenProvider) {}
  
  public async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new Error('Login Failed: invalid username or password')

    const token = this.authTokenProvider.generateToken(JSON.stringify(user.id))

    return { user, token }
  }
}

export default AuthenticateUserService

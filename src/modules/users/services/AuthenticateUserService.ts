import { compare } from 'bcryptjs'

import { ITokenProvider } from "@modules/users/providers/AuthTokenProvider/models/ITokenProvider"
import { IFindOneUserRepository } from "@modules/users/repositories/IFindOneUserRepository"
import { IAuthenticateUserService, IRequestDTO } from "@modules/users/services/interfaces/IAuthenticateUserService"
import { AppError } from "@shared/errors/AppError"
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider'



export class AuthenticateUserService implements IAuthenticateUserService {
  constructor(private usersRepository: IFindOneUserRepository, private authTokenProvider: ITokenProvider, private hashProvider: IHashProvider) {}

  public async execute({ email, password }: IRequestDTO) {
    if(!email) throw new AppError('Login Failed: No email informed')
    if(!password) throw new AppError('Login Failed: No password informed')

    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new AppError('Login Failed: invalid username or password')

    const checkPassword = await this.hashProvider.compareHash(user.password, password)

    if(!checkPassword) throw new AppError('Login Failed: Invalid username or password')

    const token = this.authTokenProvider.generateToken(JSON.stringify(user.id))

    return { user, token }
  }
}

export default AuthenticateUserService

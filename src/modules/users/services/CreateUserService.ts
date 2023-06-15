import { AppError } from '@shared/errors'
import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider'

import { ICreateUserService } from '@modules/users/services/interfaces/ICreateUserService'
import { UserEntity } from '@modules/users/entities/User'
import { ICreateUserRepository, ICreateUserRequestDTO, IFindOneUserRepository } from '@modules/users/repositories'
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider'

export class CreateUserService implements ICreateUserService {
  constructor(
    private usersRepository: ICreateUserRepository & IFindOneUserRepository,
    private hashProvider: IHashProvider,
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ email, name, password }: ICreateUserRequestDTO): Promise<UserEntity> {
    if(!email) throw new AppError('Create User Error: Missing email')
    if(!name) throw new AppError('Create User Error: Missing name')
    if(!password) throw new AppError('Create User Error: Missing password')

    const alreadyExistentUser = await this.usersRepository.findByEmail(email)

    if(alreadyExistentUser) throw new AppError('Create User Error: Email already existent')

    const hashedPassword = await this.hashProvider.generateHash(password)

    const createdUser = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword
    })

    await this.cacheProvider.invalidateByPrefix('users-list')

    return createdUser
  }
}

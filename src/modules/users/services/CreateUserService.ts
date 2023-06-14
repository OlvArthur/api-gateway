import { ICreateUserService, IRequestDTO } from '@modules/users/services/interfaces/ICreateUserService'
import { UserEntity } from '@modules/users/entities/User'
import { ICreateUserRepository, IFindOneUserRepository } from '@modules/users/repositories'
import { AppError } from '@shared/errors'
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider'

export class CreateUserService implements ICreateUserService {
  constructor(private usersRepository: ICreateUserRepository & IFindOneUserRepository, private hashProvider: IHashProvider) {}

  async execute({ email, name, password }: IRequestDTO): Promise<UserEntity> {
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

    return createdUser
  }
}

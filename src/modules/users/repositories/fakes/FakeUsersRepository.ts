import { UserEntity } from '@modules/users/entities/User'
import { IFindOneUserRepository, ICreateUserRepository, IListManyUsersRepository, ICreateUserRequestDTO } from '@modules/users/repositories'

export class FakeUsersRepository implements IFindOneUserRepository, ICreateUserRepository, IListManyUsersRepository {
  private users: UserEntity[] = []

  async findByEmail(email: string): Promise<UserEntity | null> {
    const foundSeller = this.users.find(seller => seller.email === email)

    if(!foundSeller) return null

    return foundSeller
  }

  async findMany(ids?: number[]): Promise<UserEntity[]> {
    if(ids) return this.users.filter(user => ids.includes(user.id))

    return this.users
  }

  async create({ email, name, password }: ICreateUserRequestDTO): Promise<UserEntity> {
    const userToCreate = {
      email,
      name,
      password,
      id: this.users.length + 1
    }

    this.users.push(userToCreate)

    return userToCreate
  }
}


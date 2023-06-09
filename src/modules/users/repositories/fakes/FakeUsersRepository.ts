import { IUser } from '@modules/users/entities/User'
import { IFindOneUserRepository, ICreateUserRepository } from '@modules/users/repositories'
import { User } from '@shared/infra/prisma/client'
import { IRequestDTO } from '../ICreateUserRepository'

export class FakeUsersRepository implements IFindOneUserRepository, ICreateUserRepository {
  private users: IUser[] = [
    // {
    //   id: 1,
    //   name: 'Jhon Doe',
    //   email: 'jhon.doe@test.com',
    //   password: 'testPassword', // hash of 'testPassword'
    // },
    // {
    //   id: 2,
    //   name: 'Jane Doe',
    //   email: 'jane.doe@test.com',
    //   password: 'testPassword',
    // },
    // {
    //   id: 3,
    //   name: 'Mark Doe',
    //   email: 'mark.doe@test.com',
    //   password: 'testPassword',
    // }
  ]

  async findByEmail(email: string): Promise<IUser | null> {
    const foundSeller = this.users.find(seller => seller.email === email)

    if(!foundSeller) return null

    return foundSeller
  }

  async create({ email, name, password }: IRequestDTO): Promise<IUser> {
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


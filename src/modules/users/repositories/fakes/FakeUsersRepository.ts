import { IUser } from '@modules/users/entities/User'
import { IFindOneUserRepository } from '@modules/users/repositories/IFindOneUserRepository'

export class FakeUsersRepository implements IFindOneUserRepository {
  private users: IUser[] = [
    {
      id: 1,
      name: 'Jhon Doe',
      email: 'jhon.doe@test.com',
      password: '$2a$13$BBsc6/G.64lstbs9Sg8VKOxPsR9V3DhtbXk3hnhWp/y0WkhF3.YQK', // hash of 'testPassword'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@test.com',
      password: '$2a$13$BBsc6/G.64lstbs9Sg8VKOxPsR9V3DhtbXk3hnhWp/y0WkhF3.YQK',
    },
    {
      id: 3,
      name: 'Mark Doe',
      email: 'mark.doe@test.com',
      password: '$2a$13$BBsc6/G.64lstbs9Sg8VKOxPsR9V3DhtbXk3hnhWp/y0WkhF3.YQK',
    }
  ]

  async findByEmail(email: string): Promise<IUser | null> {
    const foundSeller = this.users.find(seller => seller.email === email)

    if(!foundSeller) return null

    return foundSeller
  }
}


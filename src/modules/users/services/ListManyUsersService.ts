import { IListManyUsersService } from '@modules/users/services/interfaces/IListManyUsersService'
import { IListManyUsersRepository } from '@modules/users/repositories'
import { UserEntity } from '@modules/users/entities/User'

export class ListManyUsersService implements IListManyUsersService {
  constructor(private usersRepository: IListManyUsersRepository) {}

  async execute(idsToFilter?: string[] | number[]): Promise<UserEntity[]> {
    const ids = idsToFilter?.map(id => {
      if(typeof id === 'string') return Number(id)

      return id
    })

    const foundUsers = await this.usersRepository.findMany(ids)

    return foundUsers
  }
}

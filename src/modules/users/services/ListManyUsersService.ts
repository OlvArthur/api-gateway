import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider'

import { IListManyUsersService } from '@modules/users/services/interfaces/IListManyUsersService'
import { IListManyUsersRepository } from '@modules/users/repositories'
import { UserEntity } from '@modules/users/entities/User'

export class ListManyUsersService implements IListManyUsersService {
  constructor(private usersRepository: IListManyUsersRepository,private cacheProvider: ICacheProvider) {}

  async execute(idsToFilter?: string[] | number[]): Promise<UserEntity[]> {
    const cachedFoundUsers = await this.cacheProvider.recover<UserEntity[]>(`users-list:${idsToFilter ?? ''}`)

    if(cachedFoundUsers) return cachedFoundUsers

    const ids = idsToFilter?.map(id => Number(id))

    const foundUsers = await this.usersRepository.findMany(ids)

    await this.cacheProvider.save(`users-list:${idsToFilter ?? ''}`, foundUsers)

    return foundUsers
  }
}

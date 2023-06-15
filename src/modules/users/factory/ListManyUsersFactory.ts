import { RedisCacheProvider } from '@shared/providers/CacheProvider/implementations/RedisCacheProvider'

import { ListManyUsersControlller } from '@modules/users/infra/express/controllers/ListManyUsersController'
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { ListManyUsersService } from '@modules/users/services/ListManyUsersService'

export const listManyUsersFactory = () => {
  const cacheProvider = new RedisCacheProvider()
  const repository = new UsersRepository()
  const service = new ListManyUsersService(repository, cacheProvider)
  return new ListManyUsersControlller(service)
}

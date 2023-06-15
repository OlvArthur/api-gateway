import { RedisCacheProvider } from '@shared/providers/CacheProvider/implementations/RedisCacheProvider'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { CreateUserService } from '@modules/users/services/CreateUserService'
import { CreateUserController } from '@modules/users/infra/express/controllers/CreateUserController'

export const createUserFactory = () => {
  const cacheProvider = new RedisCacheProvider()
  const hashProvider = new BCryptHashProvider()
  const repository = new UsersRepository()
  const service = new CreateUserService(repository,hashProvider, cacheProvider)
  return new CreateUserController(service)
}

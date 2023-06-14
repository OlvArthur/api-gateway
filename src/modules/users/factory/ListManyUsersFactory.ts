import { ListManyUsersControlller } from '@modules/users/infra/express/controllers/ListManyUsersController'
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { ListManyUsersService } from '@modules/users/services/ListManyUsersService'

export const listManyUsersFactory = () => {
  const repository = new UsersRepository()
  const service = new ListManyUsersService(repository)
  return new ListManyUsersControlller(service)
}

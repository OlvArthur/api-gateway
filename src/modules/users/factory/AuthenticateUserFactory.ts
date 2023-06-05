import AuthenticateUserController from '@modules/users/infra/express/controllers/AuthenticateUserController'
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import JWTTokenProvider from '@modules/users/providers/AuthTokenProvider/implementations/JWTTokenProvider'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

export const authenticateUserFactory = () => {
  const usersRepository = new UsersRepository()
  const tokenProvider = new JWTTokenProvider()
  const authenticateUserService = new AuthenticateUserService(usersRepository, tokenProvider)
  return new AuthenticateUserController(authenticateUserService)
}

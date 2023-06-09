import AuthenticateUserController from '@modules/users/infra/express/controllers/AuthenticateUserController'
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import JWTTokenProvider from '@modules/users/providers/AuthTokenProvider/implementations/JWTTokenProvider'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'

export const authenticateUserFactory = () => {
  const usersRepository = new UsersRepository()
  const tokenProvider = new JWTTokenProvider()
  const hashProvider = new BCryptHashProvider()
  const authenticateUserService = new AuthenticateUserService(usersRepository, tokenProvider, hashProvider)
  return new AuthenticateUserController(authenticateUserService)
}

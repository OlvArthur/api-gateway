import AuthenticateUserController from "@modules/users/infra/express/controllers/AuthenticateUserController";
import UsersRepository from "../infra/prisma/repositories/UsersRepository";
import JWTTokenProvider from "../providers/AuthTokenProvider/implementations/JWTTokenProvider";
import AuthenticateUserService from "../services/AuthenticateUserService";

export const authenticateUserFactory = (): AuthenticateUserController => {
  const usersRepository = new UsersRepository()
  const tokenProvider = new JWTTokenProvider()
  const authenticateUserService = new AuthenticateUserService(usersRepository, tokenProvider)
  return new AuthenticateUserController(authenticateUserService)
}

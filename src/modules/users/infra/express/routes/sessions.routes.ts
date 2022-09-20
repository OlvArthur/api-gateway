import { Router } from 'express'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository'
import AuthenticateUserController from '@modules/users/infra/express/controllers/AuthenticateUserController'
import JWTTokenProvider from '@modules/users/providers/AuthTokenProvider/implementations/JWTTokenProvider'

import authMiddleware from '@modules/users/infra/express/middlewares/ValidateUserAuthMiddleware'

export const sessionRouter = Router()

const usersRepository = new UsersRepository()
const tokenProvider = new JWTTokenProvider()
const authenticateUserService = new AuthenticateUserService(usersRepository, tokenProvider)
const authenticateUserController = new AuthenticateUserController(authenticateUserService)

sessionRouter.post('/', (request, response) => authenticateUserController.execute(request, response))
sessionRouter.get('/', authMiddleware, (_, response) => response.json({ message: 'token valid' }))


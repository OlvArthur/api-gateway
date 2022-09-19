import { Router } from 'express'

import AuthenticateUserService from '../../../services/AuthenticateUserService'
import UsersRepository from '../../prisma/repositories/UsersRepository'
import AuthenticateUserController from '../controllers/AuthenticateUserController'
import JWTTokenProvider from '../../../providers/AuthTokenProvider/implementations/JWTTokenProvider'

import authMiddleware from '../middlewares/ValidateUserAuthMiddleware'

const sessionRouter = Router()

const usersRepository = new UsersRepository()
const tokenProvider = new JWTTokenProvider()
const authenticateUserService = new AuthenticateUserService(usersRepository, tokenProvider)
const authenticateUserController = new AuthenticateUserController(authenticateUserService)

sessionRouter.post('/', (request, response) => authenticateUserController.execute(request, response))
sessionRouter.get('/', authMiddleware, (_, response) => response.json({ message: 'token valid' }))

export default sessionRouter

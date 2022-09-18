import { Router } from 'express'

import AuthenticateUserService from '../../../services/AuthenticateUserService'
import UsersRepository from '../../prisma/repositories/UsersRepository'
import AuthenticateUserController from '../controllers/AuthenticateUserController'

const sessionRouter = Router()

const usersRepository = new UsersRepository()
const authenticateUserService = new AuthenticateUserService(usersRepository)
const authenticateUserController = new AuthenticateUserController(authenticateUserService)

sessionRouter.post('/', (request, response) => authenticateUserController.execute(request, response))

export default sessionRouter

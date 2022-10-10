import { Router } from 'express'

import { adaptExpressRouter } from '@shared/infra/express/adapters'

import { authenticateUserFactory } from '@modules/users/factory'

import authMiddleware from '@modules/users/infra/express/middlewares/ValidateUserAuthMiddleware'

export const sessionRouter = Router()

sessionRouter.post('/', adaptExpressRouter(authenticateUserFactory()))
sessionRouter.get('/', authMiddleware, (_, response) => response.json({ message: 'token valid' }))


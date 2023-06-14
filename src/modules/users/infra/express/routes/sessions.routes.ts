import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { adaptExpressRouter } from '@shared/infra/express/adapters'
import { authenticateUserFactory } from '@modules/users/factory'

import authMiddleware from '@modules/users/infra/express/middlewares/ValidateUserAuthMiddleware'

export const sessionRouter = Router()

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  adaptExpressRouter(authenticateUserFactory())
)
sessionRouter.get('/', authMiddleware, (_, response) => response.json({ message: 'token valid' }))

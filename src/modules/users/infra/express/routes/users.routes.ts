import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { createUserFactory, listManyUsersFactory } from '@modules/users/factory'
import { adaptExpressRouter } from '@shared/infra/express/adapters'
import authMiddleware from '@modules/users/infra/express/middlewares/ValidateUserAuthMiddleware'

export const usersRouters = Router()

usersRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required()
    })
  }),
  adaptExpressRouter(createUserFactory())
)

usersRouters.get(
  '/',
  authMiddleware,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      idsToFilter: Joi.string().regex(/^\d+(,\d+)*$/)
    })
  }),
  adaptExpressRouter(listManyUsersFactory())
)
